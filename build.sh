#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
image_name="aurumos-iso"

mkdir -p "$repo_root/output"
docker build -t "$image_name" "$repo_root"
docker run --rm --privileged \
	--volume "$repo_root/output:/output" \
	"$image_name"