using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    [Table("Notas")]
    public class Nota
    {
        [Key]
        [Column("id_nota")]
        public int Id { get; set; }

        [Column("valor_nota")]
        public decimal Valor { get; set; }

        [Column("id_estudante")]
        public int EstudanteId { get; set; }

        public Estudante? Estudante { get; set; }

        [Column("id_disciplina")]
        public int DisciplinaId { get; set; }  

        public Disciplina? Disciplina { get; set; } 
    }
}
