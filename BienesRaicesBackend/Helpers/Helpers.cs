using System.Net.Mail;
using System.Net;

namespace BienesRaicesBackend.Helpers
{
    public class Helpers
    {
        public static string GetImage(string url)
        {
            int lastSlashIndex = url.LastIndexOf('/');
            string id = "";
            if (lastSlashIndex != -1)
            {
 
                id = url.Substring(lastSlashIndex + 1);

            }
            else
            {
                Console.WriteLine("URL no válida");
            }
            return id;
        }

        public static string GetUrl(string referer, string token, string path)
        {

            Uri refererUri = new Uri(referer);
            string urlConfirmacion = $"{refererUri.GetLeftPart(UriPartial.Authority)}/{path}/{token}";
            return urlConfirmacion; 
        }

    }
}
