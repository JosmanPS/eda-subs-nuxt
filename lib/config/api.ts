const isProduction = process.env.NODE_ENV === 'production'

const devApiConfig = {
  baseUrl: process.env.API_BASE_URL || 'http://127.0.0.1:1337/api',
}

// TODO: Verificar por qué no lee la variable env en este file.
const prodApiConfig = {
  baseUrl:
    process.env.API_BASE_URL || 'https://admin.escueladeavivamiento.com/api',
}

const apiConfig = isProduction ? prodApiConfig : devApiConfig

export { apiConfig }
