import sys
import os

# Make the repo root importable so 'from Backend.main import app' resolves correctly
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from Backend.main import app  # noqa: F401  — Vercel picks up the 'app' name automatically