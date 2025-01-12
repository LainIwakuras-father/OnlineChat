from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from users.router import users_router
from chat.router import chat_router



app = FastAPI(title="OnlineChat",version="0.1.0", description="API для Онлайн чата",debug=True)

app.mount('/static', StaticFiles(directory='static'), name='static')
app.include_router(users_router)
app.include_router(chat_router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
