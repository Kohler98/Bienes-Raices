using BienesRaicesBackend.Services.Contracts;
using static System.Net.Mime.MediaTypeNames;
using System.Collections;
using System.Net.Mail;
using System.Net;
using System.ComponentModel;

namespace BienesRaicesBackend.Services.Repositories
{
    public class AlmacenarArchivos : IAlmacenarArchivos
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public AlmacenarArchivos(IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor)
        {
            _webHostEnvironment = webHostEnvironment;
            _httpContextAccessor = httpContextAccessor;
        }

        public Task Borrar(string ruta, string container)
        {
            string wwwrootPath = _webHostEnvironment.WebRootPath;

            if (string.IsNullOrEmpty(wwwrootPath))
            {
                throw new Exception();
            }

            var nombreArchivo = Path.GetFileName(ruta);
            string pathFinal = Path.Combine(wwwrootPath,container, nombreArchivo);

            if (File.Exists(pathFinal))
            {
                File.Delete(pathFinal);
            }
            return Task.CompletedTask;

        }
 
        public async Task<string> Crear(byte[] file, string ContentType, string extension, string container, string nombre)
        {
            string wwwrootPath = _webHostEnvironment.WebRootPath;
 
            string carpetaArchivo = Path.Combine(wwwrootPath, container);
            if (!Directory.Exists(carpetaArchivo))
            {
                Directory.CreateDirectory(carpetaArchivo);
            }

            using (var ms = new MemoryStream(file))
            {
                string nombreFinal = $"{nombre}{extension}";

                string rutaFinal = Path.Combine(carpetaArchivo, nombreFinal);
 
                using (var fs = new FileStream($"{rutaFinal}", FileMode.Create))
                {
                    ms.WriteTo(fs);
                }
   
                string urlImage = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}";

                string dbUrl = Path.Combine(urlImage, container, nombreFinal).Replace("\\", "/");
 
                return dbUrl;

            }
        }
        public bool SendMail(string to, string asunto, string fileName, string url, string nombre)
        {
            string wwwrootPath = _webHostEnvironment.WebRootPath;
            string container = "views";
            if (string.IsNullOrEmpty(wwwrootPath))
            {
                throw new Exception();
            }
            var nombreArchivo = Path.GetFileName(fileName);
            string pathFinal = Path.Combine(wwwrootPath, container, nombreArchivo);

 
            string msge = "Error al enviar este correo. Por favor verifique los datos o intente mas tarde";
            string from = "janettrevino96@hotmail.com";
            string displayName = "Real State";
            try
            {
                MailMessage mail = new MailMessage();
                mail.From = new MailAddress(from, displayName);

                mail.To.Add(to);
                string body;
                using (StreamReader reader = new StreamReader(pathFinal))
                {
                    body = reader.ReadToEnd();
                }
                body = body.Replace("<%=url %>", url);
                body = body.Replace("<%=nombre %>", nombre);
 
 
                mail.Subject = asunto;
                mail.Body = body;
                mail.IsBodyHtml = true;
                SmtpClient client = new SmtpClient("smtp-mail.outlook.com", 587);
                client.Credentials = new NetworkCredential(from, "26204876vl");
                client.EnableSsl = true;

                client.Send(mail);


                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return false;
            }

        }
    }
}
