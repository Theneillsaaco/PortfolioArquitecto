using System.Net.Http.Json;
using Portfolio_Arquitecto.Models;

namespace Portfolio_Arquitecto.Services;

public class ProyectoService
{
    public async Task<List<Proyecto>> ObtenerProyectos()
    {
        try
        {
            var proyectos = await _httpClient.GetFromJsonAsync<List<Proyecto>>("data/proyectos.json");
            return proyectos ?? new List<Proyecto>();
        }
        catch 
        {
            return ProyectosMock();
        }        
    }

    public async Task<Proyecto?> ObtenerProyectosPorId(int id)
    {
        var proyectos = await ObtenerProyectos();
        return proyectos.FirstOrDefault(p => p.Id == id);
    }

    private List<Proyecto> ProyectosMock()
    {
        return new()
        {
            new Proyecto
            {
                Id = 1,
                Titulo = "Casa Familiar Moderna",
                Descripcion = "Vivienda unifamiliar de dos plantas con diseño contemporáneo, priorizando la integración con el entorno natural y la eficiencia energética.",
                DescripcionCorta = "Vivienda unifamiliar contemporanea",
                Categoria = "Residencial",
                Ubicacion = "Rosario, Santa Fe",
                Area = "250 m²",
                Year = 2023,
                ImagenPrincipal = "images/proyectos/casa1/principla.jpg",
                Imagens = new List<string>
                {
                    "images/proyectos/casa1/exterior1.jpg",
                    "images/proyectos/casa1/interior1.jpg",
                    "images/proyectos/casa1/interior2.jpg"
                },
                Tags = new List<string> { "Moderno", "Sustentable", "Familiar" },
                EstadoProyecto = "Ejecutado"
            }
        };
    }
    
    #region Fields

    private readonly HttpClient _httpClient;
    
    public ProyectoService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    #endregion
}