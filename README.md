# aurumOS

<div align="center">

![GitHub Issues](https://img.shields.io/github/issues/Ecliptica-Ltd/aurumOS?style=for-the-badge&logo=github&logoColor=C99700&label=Issues&labelColor=black&color=C99700)

</div>

## Description

**aurumOS** is an Arch Linux-based live and installation ISO built around the
COSMIC desktop and Calamares installer. It provides a focused, modern desktop
environment while retaining the storage, networking, and firmware tools needed
to install aurumOS on typical x86_64 hardware.

The ISO profile is configured for both BIOS Syslinux and UEFI systemd-boot
media. Monthly release identifiers use the `State-YYYY.MM-Codename` format;
for example, `aurumOS-Beta-2026.10-Helios-x86_64.iso`.

## Building

### Docker (recommended)

Docker provides a repeatable Arch Linux build environment. From the repository
root, build the image and mount an output directory:

```sh
mkdir -p output
docker build -t aurumos-iso:latest .
docker run --rm --privileged \
  -v "$(pwd)/output:/output" \
  aurumos-iso:latest
```

The generated ISO is written to `output/`.

### Arch Linux host

On an up-to-date Arch Linux host, install the build dependencies and use one
of the supplied scripts:

```sh
sudo pacman -Syu --needed archiso sudo
./installation-scripts/30-build-the-iso-the-first-time.sh
```

`30-build-the-iso-the-first-time.sh` starts from a clean package cache.
`40-build-the-iso-local-again.sh` reuses the local cache for subsequent builds.
See [archiso.md](archiso.md) for additional Archiso notes.

## Configuration

* Edit [archiso/packages.x86_64](archiso/packages.x86_64) to change software
  included in the live ISO.
* Edit [archiso/profiledef.sh](archiso/profiledef.sh) for ISO metadata,
  boot modes, compression, and release naming.
* Edit [archiso/pacman.conf](archiso/pacman.conf) to configure package sources
  used during the ISO build.

The live system identifies itself as aurumOS through
`/etc/os-release`; its profile is Arch-compatible (`ID_LIKE=arch`).

## Downloads and support

* [Development build workflows](https://github.com/Ecliptica-Ltd/aurumOS/actions)
* [Releases](https://github.com/Ecliptica-Ltd/aurumOS/releases)
* [Issue tracker](https://github.com/Ecliptica-Ltd/aurumOS/issues)

When filing an issue, include the ISO version, boot mode (BIOS or UEFI),
hardware details, and the relevant build or boot log.
