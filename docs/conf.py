import subprocess
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[1]
PROFILE_PATH = REPO_ROOT / "archiso" / "profiledef.sh"
PROFILE_SCRIPT = r"""
set -e
declare -A file_permissions
source "$1"
printf '%s\0' "$iso_name" "$iso_state" "$iso_codename" "$iso_version" \
  "$iso_label" "$iso_publisher" "$iso_application" "$arch" \
	"${buildmodes[*]}" "${bootmodes[*]}" "$release_month"
"""
profile_values = subprocess.run(
	["bash", "-c", PROFILE_SCRIPT, "profiledef", str(PROFILE_PATH)],
	check=True,
	capture_output=True,
	text=True,
).stdout.rstrip("\0").split("\0")

(
	iso_name,
	iso_state,
	iso_codename,
	iso_version,
	iso_label,
	iso_publisher,
	iso_application,
	architecture,
	build_modes,
	boot_modes,
	release_month,
) = profile_values
build_modes = ", ".join(build_modes.split())
boot_modes = ", ".join(boot_modes.split())

project = iso_name
copyright = f"{release_month.split('.')[0]}, Project Elaris"
author = "Project Elaris"
version = iso_version
release = iso_version

rst_prolog = "\n".join(
	(
		f".. |iso-name| replace:: {iso_name}",
		f".. |iso-state| replace:: {iso_state}",
		f".. |iso-codename| replace:: {iso_codename}",
		f".. |iso-version| replace:: {iso_version}",
		f".. |iso-label| replace:: {iso_label}",
		f".. |iso-application| replace:: {iso_application}",
		f".. |architecture| replace:: {architecture}",
		f".. |build-modes| replace:: {build_modes}",
		f".. |boot-modes| replace:: {boot_modes}",
	)
)

html_context = {
	"iso_name": iso_name,
	"iso_state": iso_state,
	"iso_codename": iso_codename,
	"iso_version": iso_version,
	"iso_label": iso_label,
	"iso_publisher": iso_publisher,
	"iso_application": iso_application,
	"architecture": architecture,
	"build_modes": build_modes,
	"boot_modes": boot_modes,
	"release_month": release_month,
}

extensions = []
exclude_patterns = ["_build"]

html_theme = "furo"
html_title = f"{iso_name} {iso_version} | Arch Linux, made approachable"
html_static_path = ["_static"]
html_css_files = ["site.css"]
html_js_files = ["releases.js"]

html_theme_options = {
	"sidebar_hide_name": True,
	"navigation_with_keys": True,
	"light_css_variables": {
		"color-brand-primary": "#087f83",
		"color-brand-content": "#087f83",
		"color-background-primary": "#fbfcfa",
		"color-background-secondary": "#eef3f1",
		"color-foreground-primary": "#183238",
		"color-foreground-secondary": "#52686b",
	},
	"dark_css_variables": {
		"color-brand-primary": "#70d6ce",
		"color-brand-content": "#70d6ce",
		"color-background-primary": "#101d20",
		"color-background-secondary": "#18292d",
		"color-foreground-primary": "#edf6f3",
		"color-foreground-secondary": "#b3c5c1",
	},
}