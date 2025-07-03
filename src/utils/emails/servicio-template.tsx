export const servicioTemplate = (
    name: string,
    email: string,
    phone: string,
    service: string,
    message: string
  ) => {
    return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Nuevo Mensaje de Contacto</title>
    </head>
    <body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',Roboto,sans-serif;color:#1f2937;">
      <table width="100%" style="background-color:#2563eb;padding:2rem 0;text-align:center;">
        <tr>
          <td>
            <img src="https://res.cloudinary.com/dsu3au60t/image/upload/v1745271496/logo_rhz1cv.png" alt="Logo RH Solutions" width="120" height="120" style="border-radius:50%;background:#fff;padding:10px;" />
            <h1 style="color:#fff;font-size:2rem;margin:1rem 0 0;">¡Cotización para ${service.toUpperCase()}!</h1>
          </td>
        </tr>
      </table>
  
      <table width="100%" style="padding:2rem;background:#ffffff;max-width:600px;margin:auto;">
        <tr>
          <td style="font-size:1rem;padding-bottom:1rem;">
            <strong>Nombre:</strong> ${name.toUpperCase()}
          </td>
        </tr>
        <tr>
          <td style="font-size:1rem;padding-bottom:1rem;">
            <strong>Correo electrónico:</strong> ${email}
          </td>
        </tr>
        <tr>
          <td style="font-size:1rem;padding-bottom:1rem;">
            <strong>Teléfono:</strong> ${phone}
          </td>
        </tr>
        <tr>
          <td style="font-size:1rem;padding-bottom:1rem;">
            <strong>Invitación solicitada:</strong> ${service}
          </td>
        </tr>
        <tr>
          <td style="font-size:1rem;padding-bottom:1.5rem;">
            <strong>Mensaje:</strong><br/>
            <p style="margin-top:0.5rem;color:#374151;">${message}</p>
          </td>
        </tr>
      </table>
  
      <table width="100%" style="background-color:#f4f4f5;text-align:center;padding:1rem;margin-top:2rem;">
        <tr>
          <td style="font-size:0.875rem;color:#6b7280;">
            Has recibido una nueva solicitud de cotización a través de tu formulario de contacto.
          </td>
        </tr>
      </table>
    </body>
    </html>
    `
  }
  