using System.ComponentModel.DataAnnotations;

namespace api.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; } = "";

        [Required, StringLength(100, MinimumLength = 8)]
        public string Password { get; set; } = "";
        public string FirstName { get; set; } = "";
        public string LastName { get; set; } = "";
        

    }
}