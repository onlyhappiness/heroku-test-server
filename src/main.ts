import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { IoAdapter } from '@nestjs/platform-socket.io'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // web socket
  app.useWebSocketAdapter(new IoAdapter(app))

  // const port = process.env.PORT || 5000
  await app
    .listen(3000)
    .then(() => {
      console.log(
        `✅ Server on http://localhost:${3000}\nstartDate: ${new Date().toISOString()}`,
      )
    })
    .catch((error) => {
      console.error(`🆘 Server error ${error}`)
    })

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(() => app.close())
  }
}

bootstrap()
