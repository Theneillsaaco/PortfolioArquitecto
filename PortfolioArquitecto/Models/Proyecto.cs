namespace Portfolio_Arquitecto.Models;

public class Proyecto
{
    public int Id { get; set; }
    
    public string Titulo { get; set; } = string.Empty;
    
    public string Descripcion { get; set; } = string.Empty;
    
    public string DescripcionCorta { get; set; } = string.Empty;
    
    public string Categoria { get; set; } = string.Empty;
    
    public string Ubicacion { get; set; } = string.Empty;
    
    public string Area { get; set; } = string.Empty;
    
    public int Year { get; set; }
    
    public string ImagenPrincipal { get; set; } = string.Empty;
    
    public List<string> Imagens { get; set; } = new();
    
    public List<string> Tags { get; set; } = new();
    
    public string EstadoProyecto { get; set; } = string.Empty;
}