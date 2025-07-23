# THIS PROJECT DOES NOT USE DOCKER
# If you are seeing this file being executed, your deployment platform
# is incorrectly trying to use Docker instead of nixpacks

FROM scratch
RUN echo "ERROR: This project does not use Docker!" && \
    echo "Please configure your deployment platform to use nixpacks instead of Docker." && \
    echo "See nixpacks.toml and railway.toml for proper configuration." && \
    exit 1