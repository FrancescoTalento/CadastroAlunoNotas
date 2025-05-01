using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Disciplinas")]
    public class Disciplina
    {
        [Key]
        [Column("id_disciplina")]
        public int Id { get; set; }

        [Column("nome")]
        [MaxLength(100)]
        public string Nome { get; set; } = string.Empty;

        public ICollection<Nota> Notas { get; set; } = new List<Nota>();
    }
}
