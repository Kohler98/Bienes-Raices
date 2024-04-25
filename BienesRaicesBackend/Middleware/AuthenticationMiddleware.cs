using System.Text.Json;

namespace BienesRaicesBackend.Middleware;
 
public class AuthenticationMiddleware
{
    private readonly RequestDelegate _next; // ... other fields and constructor

    public AuthenticationMiddleware(RequestDelegate next) // ... other constructor arguments
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Verificar si el usuario está autenticado
        if (!context.User.Identity.IsAuthenticated)
        {
            var errorResponse = new { mensaje = "Debe iniciar sesión primero", error = "Unauthorized" };
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            await context.Response.WriteAsJsonAsync( errorResponse);
            return;
        }

        // El usuario está autenticado, continuar con la siguiente solicitud
        await _next(context);
    }
}

public static class RequestAuthenticationMiddleware
{
    public static IApplicationBuilder UseRequestCulture(
    this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<AuthenticationMiddleware>();
    }
}