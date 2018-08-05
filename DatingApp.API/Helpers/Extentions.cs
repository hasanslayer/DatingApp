using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public static class Extentions
    {
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            // Here we customize the error handler 
            response.Headers.Add("Applicatoin-Error", message); // the messege that coming back from exception
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin","*"); // any origin can access this particular header

        }
    }
}