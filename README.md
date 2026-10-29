<div align="center">
<h1>aurumOS</h1>

![GitHub Issues](https://img.shields.io/github/issues/Ecliptica-Ltd/aurumOS?style=for-the-badge&logo=github&logoColor=C99700&label=Issues&labelColor=black&color=C99700)

</div>

<h2 align="center">Description</h2>

**aurumOS** is an Arch Linux-based live and installation ISO built around the
COSMIC desktop and Calamares installer. It provides a focused, modern desktop
environment while retaining the storage, networking, and firmware tools needed
to install aurumOS on typical x86_64 hardware.

> [!CAUTION]
> Project is on deep alpha state.

> [!TIP]
> But, if you want to help us, you can do it by submitting pull requests!

<h2 align="center">Building</h2>

<h3 align="center">Docker</h3>
<h4 align="center">(recommended)</h4>

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

<h3 align="center">Arch host</h3>

On an up-to-date Arch Linux host, install the build dependencies and use one
of the supplied scripts:

```sh
sudo pacman -Syu --needed archiso sudo
./installation-scripts/30-build-the-iso-the-first-time.sh
```

`30-build-the-iso-the-first-time.sh` starts from a clean package cache.
`40-build-the-iso-local-again.sh` reuses the local cache for subsequent builds.
See [archiso.md](archiso.md) for additional Archiso notes.

<h2 align="center">Configuration</h2>

* Edit [archiso/packages.x86_64](archiso/packages.x86_64) to change software
  included in the live ISO.
* Edit [archiso/profiledef.sh](archiso/profiledef.sh) for ISO metadata,
  boot modes, compression, and release naming.
* Edit [archiso/pacman.conf](archiso/pacman.conf) to configure package sources
  used during the ISO build.

The live system identifies itself as aurumOS through
`/etc/os-release`; its profile is Arch-compatible (`ID_LIKE=arch`).

<h2 align="center">Downloads and support</h2>

* [Development build workflows](https://github.com/Project-Elaris/aurumOS/actions)
* [Releases](https://github.com/Project-Elaris/aurumOS/releases)
* [Issue tracker](https://github.com/Project-Elaris/aurumOS/issues)

> [!TIP]
> When filing an issue, include the ISO version, boot mode (BIOS or UEFI),
> hardware details, and the relevant build or boot log.
