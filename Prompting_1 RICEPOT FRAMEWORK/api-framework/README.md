# Enterprise REST Assured API Testing Framework (Python)

This project provides a modular, enterprise-ready REST API automation framework built with Python, Pytest, Requests, and Allure.

## Features

- Modular structure for scalable automation
- Reusable API client and request builder
- Authentication support for Basic, Bearer, JWT, API key, and custom headers
- Response validation, schema validation, and assertion helpers
- Logging and reporting with Allure and HTML reports
- Environment-based configuration via .env and config.yaml
- Sample CRUD, upload, and authentication tests

## Requirements

- Python 3.12+
- pip

## Installation

```bash
python -m venv .venv
source .venv/bin/activate  # Linux/macOS
.venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

## Configuration

Set environment-specific values in .env or config/config.yaml.

## Execution

```bash
pytest
```

## Reporting

- HTML report: reports/pytest-report.html
- Allure results: allure-results/
- Allure report: allure-report/

Generate Allure report:

```bash
allure generate allure-results -o allure-report --clean
allure open allure-report
```

## Sample Tests

The sample suite includes:

- GET, POST, PUT, PATCH, DELETE examples
- File upload flow
- Basic authentication flow
