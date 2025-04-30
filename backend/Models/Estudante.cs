using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Estudantes")]
    public class Estudante
    {
        [Key]
        [Column("id_estudante")]
        public int Id { get; set; }

        [Column("nome")]
        [MaxLength(100)]
        public string Nome { get; set; } = string.Empty;

        [Column("frequencia")]
        public decimal Frequencia { get; set; }  

        public List<Nota> Notas { get; set; } = new();
    }
}
