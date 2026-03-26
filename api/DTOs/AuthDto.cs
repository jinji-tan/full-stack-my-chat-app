using System.ComponentModel.DataAnnotations;

namespace api.DTOs
{
    public class AuthDto
    {
        [Required, EmailAddress]
        public string Email { get; set; } = "";

        [Required, StringLength(100, MinimumLength = 8)]
        public string Password { get; set; } = "";
    }
}