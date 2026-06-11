from __future__ import annotations

import json
import re
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]
SRC_DOCX = Path(r"C:\Users\Anjyfade\Downloads\ENS_PRIVACY_POLICY_.docx")
OUT_JSON = ROOT / "src" / "landingpage" / "features" / "Legal" / "data" / "privacyPolicy.generated.json"

NS = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
SUBHEADING_RE = re.compile(r"^(\d+\.\d+\s+|[a-z]\.\s+)", re.I)


def normalize(text: str) -> str:
    replacements = [
        ("ENSTEAD.co", "yourcreditpal.com"),
        ("ENSTEAD Company Limited", "YourCreditPal Company Limited"),
        ("ENSTEAD’s", "YourCreditPal's"),
        ("ENSTEAD", "YourCreditPal"),
        ("“ENSTEAD”", "“YourCreditPal”"),
        ("'ENSTEAD'", "'YourCreditPal'"),
    ]
    for old, new in replacements:
        text = text.replace(old, new)
    return text


def raw_text(elem: ET.Element) -> str:
    parts: list[str] = []
    for node in elem.iter():
        if node.tag == f"{{{NS['w']}}}t":
            parts.append(node.text or "")
        elif node.tag == f"{{{NS['w']}}}tab":
            parts.append(" ")
        elif node.tag == f"{{{NS['w']}}}br":
            parts.append(" ")
    return " ".join("".join(parts).split())


def all_capsish(text: str) -> bool:
    return text == text.upper() and len(text) > 4


def section_obj(title: str) -> dict:
    return {"title": title, "paragraphs": [], "bullets": [], "subsections": [], "tables": []}


def subsection_obj(title: str) -> dict:
    return {"title": title, "paragraphs": [], "bullets": [], "tables": []}


def parse_docx() -> dict:
    with zipfile.ZipFile(SRC_DOCX) as zf:
        xml = zf.read("word/document.xml")

    root = ET.fromstring(xml)
    body = root.find("w:body", NS)
    if body is None:
        raise RuntimeError("Could not find document body")

    paragraphs = []
    tables = []
    for child in body:
        tag = child.tag.split("}")[-1]
        if tag == "p":
            txt = normalize(raw_text(child))
            if not txt:
                continue
            pstyle = child.find(".//w:pStyle", NS)
            style = pstyle.attrib.get(f"{{{NS['w']}}}val") if pstyle is not None else ""
            paragraphs.append((style, txt))
        elif tag == "tbl":
            rows = []
            for tr in child.findall("w:tr", NS):
                row = [normalize(raw_text(tc)) for tc in tr.findall("w:tc", NS)]
                rows.append(row)
            tables.append(rows)
            paragraphs.append(("TABLE", len(tables) - 1))

    # Prelude
    eyebrow = "YourCreditPal Company Limited"
    title = "Privacy Policy"
    intro = "Lead Generation & Loan Referral Platform"
    updated_at = "June 2026"
    callout_title = "IMPORTANT NOTICE - PLEASE READ CAREFULLY"
    callout_body = ""
    prelude_consumed = False
    prelude_body: list[str] = []
    heading1_seen = False
    for style, value in paragraphs:
        if style == "Heading1":
            heading1_seen = True
            break
        if isinstance(value, str):
            if value in {"ENSTEAD COMPANY LIMITED", "PRIVACY POLICY", "Lead Generation & Loan Referral Platform", "Last Updated: June 2026"}:
                continue
            if value == "IMPORTANT NOTICE - PLEASE READ CAREFULLY":
                prelude_consumed = True
                continue
            if prelude_consumed:
                prelude_body.append(value)
    if prelude_body:
        callout_body = " ".join(prelude_body[:2]) if len(prelude_body) <= 2 else " ".join(prelude_body[:2])

    sections: list[dict] = []
    current_section: dict | None = None
    current_subsection: dict | None = None
    skip_table_index = 0

    for style, value in paragraphs:
        if style == "TABLE":
            if current_subsection is not None:
                current_subsection["tables"].append({"headers": tables[value][0] if tables[value] else [], "rows": tables[value][1:]})
            elif current_section is not None:
                current_section["tables"].append({"headers": tables[value][0] if tables[value] else [], "rows": tables[value][1:]})
            continue

        text = value
        if style == "Heading1":
            current_section = section_obj(text)
            sections.append(current_section)
            current_subsection = None
            continue

        if current_section is None:
            continue

        is_subheading = style == "Heading2" or bool(SUBHEADING_RE.match(text)) or all_capsish(text)
        if is_subheading and text not in {"IMPORTANT NOTICE - PLEASE READ CAREFULLY"}:
            current_subsection = subsection_obj(text)
            current_section["subsections"].append(current_subsection)
            continue

        target = current_subsection if current_subsection is not None else current_section
        if style == "ListParagraph":
            target["bullets"].append(text)
        else:
            target["paragraphs"].append(text)

    return {
        "eyebrow": eyebrow,
        "title": title,
        "intro": intro,
        "updatedAt": updated_at,
        "calloutTitle": callout_title,
        "calloutBody": callout_body,
        "toc": [section["title"] for section in sections],
        "sections": sections,
    }


def main() -> None:
    data = parse_docx()
    OUT_JSON.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")
    print(OUT_JSON)


if __name__ == "__main__":
    main()
