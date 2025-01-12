from sqlalchemy import func
from datetime import datetime
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession, AsyncAttrs
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

from src.core.configs import Settings

'''
Подключение к серверу
'''
DB_URL = Settings.DB_URL
engine = create_async_engine(DB_URL)
'''
Создание сессии для работы с БД
'''
async_session = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
"""
Создание моделей для БД
"""
class Base(AsyncAttrs, DeclarativeBase):
    reated_at: Mapped[datetime] = mapped_column(server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(server_default=func.now(), onupdate=func.now())
"""
функции создания  и удаления БД
"""
async def create_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

async def drop_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
