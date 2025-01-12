from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from src.chat.router import router


app = FastAPI(title="OnlineChat",version="0.1.0", description="API для Онлайн чата",debug=True)

app.mount('/static', StaticFiles(directory='src/static'), name='static')
app.include_router(router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
