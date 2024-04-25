using static System.Net.Mime.MediaTypeNames;

namespace BienesRaicesBackend.Services.Contracts
{
    public interface IAlmacenarArchivos
    {
        public Task<string> Crear(byte[] file, string ContentType, string extension, string container, string nomber);

        public Task Borrar(string ruta, string container);
        public bool SendMail(string to, string asunto, string pathName, string url, string nombre);


    }
}
