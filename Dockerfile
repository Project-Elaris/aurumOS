FROM archlinux:latest

# Set environment variables
ENV OUTPUT_DIR=/output

# Refresh the base image before installing build dependencies.  Using -Sy
# alone risks a partial upgrade and can leave the build container inconsistent.
RUN pacman -Syu --noconfirm --needed archiso sudo \
    && pacman -Scc --noconfirm

# Copy directories
COPY archiso /archiso

# Copy installation script
COPY installation-scripts/ /installation-scripts/
RUN chmod +x /installation-scripts/30-build-the-iso-the-first-time.sh

# Run the installation script
CMD ["/installation-scripts/30-build-the-iso-the-first-time.sh"]
