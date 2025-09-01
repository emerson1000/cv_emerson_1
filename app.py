from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import json

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

locales = {}
for lang in ("en", "es"):
    with open(f"locales/{lang}.json", encoding="utf-8") as f:
        locales[lang] = json.load(f)

@app.get("/")
def home(request: Request, lang: str = "es"):
    data = locales.get(lang, locales["es"])
    return templates.TemplateResponse("index.html", {"request": request, "data": data})