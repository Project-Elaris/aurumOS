# aurumOS

[![Build ISO](https://github.com/Project-Elaris/aurumOS/actions/workflows/build.yaml/badge.svg)](https://github.com/Project-Elaris/aurumOS/actions/workflows/build.yaml)
[![Latest release](https://img.shields.io/github/v/release/Project-Elaris/aurumOS?display_name=tag)](https://github.com/Project-Elaris/aurumOS/releases)
[![Documentation](https://readthedocs.org/projects/aurumos/badge/?version=latest)](https://aurumos.readthedocs.io/en/latest/)

**aurumOS** is an Arch Linux-based live and installation ISO featuring the
COSMIC desktop and Calamares installer. The image includes common networking,
firmware, storage, and filesystem tools for installing a system on x86_64 PCs.

> [!WARNING]
> aurumOS is in an early beta. Back up important data before installing, and
> verify that the live image supports your hardware.

## Build an ISO

Docker is the recommended build environment. Install Docker, then run this
command from the repository root:

```sh
./build.sh
```

The ISO and optional package list are written to `output/`. ISO version and
filename are derived from `archiso/profiledef.sh`.

For native builds on Arch Linux, see the [build guide](docs/building.rst).

## Documentation

The full guide covers [building](docs/building.rst),
[ISO configuration](docs/configuration.rst),
[troubleshooting](docs/troubleshooting.rst), and
[contributing](docs/contributing.rst). It is configured for
[Read the Docs](https://aurumos.readthedocs.io/en/latest/).

## Project links

- [Latest releases](https://github.com/Project-Elaris/aurumOS/releases)
- [Build workflows](https://github.com/Project-Elaris/aurumOS/actions)
- [Report a problem](https://github.com/Project-Elaris/aurumOS/issues)

When reporting a problem, include the ISO version, boot mode (BIOS or UEFI),
hardware details, and relevant build or boot logs.