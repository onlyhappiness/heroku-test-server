import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { IoAdapter } from '@nestjs/platform-socket.io'

declare const module: any

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // web socket
  app.useWebSocketAdapter(new IoAdapter(app))

  const port = process.env.PORT || 3000
  await app
    .listen(port)
    .then(() => {
      console.log(
        `✅ Server on http://localhost:${port}\nstartDate: ${new Date().toISOString()}`,
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
