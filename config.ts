export const config = {
  PROJECT_NAME: "Argus Logistics",
  EMAIL_MS: process.env.NEXT_PUBLIC_EMAIL_MS || "",
}

// Validar que EMAIL_MS esté definido
if (!config.EMAIL_MS) {
  console.warn(
    "⚠️ La variable de entorno NEXT_PUBLIC_EMAIL_MS no está definida. El servicio de email no funcionará correctamente.",
  )
}
