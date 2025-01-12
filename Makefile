# Укажите интерпретатор shell
SHELL := cmd.exe

# Переменные
POETRY = poetry
PYTHON = python
DOCKER_COMPOSE = docker-compose
ALEMBIC = alembic

# Цели
.PHONY: install test lint format run migrate

# Установка зависимостей
install:
	@echo "Установка зависимостей..."
	@$(POETRY) install

# Запуск тестов
test:
	@echo "Запуск тестов..."
	@$(POETRY) run pytest

# Проверка кода с помощью линтеров
lint:
	@echo "Проверка кода с помощью линтеров..."
	@$(POETRY) run flake8 .
	@$(POETRY) run pylint app

# Форматирование кода
format:
	@echo "Форматирование кода..."
	@$(POETRY) run black .

# Запуск приложения
run:
	@echo "Запуск приложения..."
	@$(DOCKER_COMPOSE) up --build

# Применение миграций базы данных
migrate:
	@echo "Применение миграций базы данных..."
	@$(ALEMBIC) upgrade head

# Запуск всех проверок и тестов
check:
	lint
	test
	format

# Цель по умолчанию
.DEFAULT_GOAL := help

# Справка
help:
	@echo "Доступные команды:"
	@echo "  install: Установка зависимостей"
	@echo "  test: Запуск тестов"
	@echo "  lint: Проверка кода с помощью линтеров"
	@echo "  format: Форматирование кода"
	@echo "  run: Запуск приложения"
	@echo "  migrate: Применение миграций базы данных"
	@echo "  check: Запуск всех проверок и тестов"
