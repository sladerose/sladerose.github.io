# sladerose.github.io

Run your own race. This represents the personal portfolio and digital home of Slade Rose.

## Overview

A minimalist, high-performance personal website designed to showcase projects and skills. It features a stark, high-contrast dark mode aesthetic and automated content updates.

## Features

- **Minimalist Design**: Clean, typography-focused UI using the Inter font family.
- **Dark Mode Native**: Built with a deep `#111111` background for reduced eye strain and premium feel.
- **Automated Portfolio**: Includes a Ruby script (`update_projects.rb`) that automatically fetches and displays the latest top 5 repositories from GitHub.
- **Responsive**: Fully responsive layout that scales gracefully from mobile to desktop (max-width 720px).

## Setup & Automation

The project list is automated. To update it locally:

1. Ensure you have Ruby installed.
2. Run the update script:
   ```bash
   ruby update_projects.rb
   ```
   This will fetch the latest public repositories for user `sladerose` and update `index.html`.

## Project Structure

- `index.html`: Main entry point.
- `style.css`: All styles (no frameworks, just pure CSS).
- `update_projects.rb`: Automation script for fetching GitHub data.
