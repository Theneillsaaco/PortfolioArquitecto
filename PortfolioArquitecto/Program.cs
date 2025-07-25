using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Portfolio_Arquitecto;
using Portfolio_Arquitecto.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });

// Services
builder.Services.AddBlazorBootstrap();builder.Services.AddBlazorBootstrap();
builder.Services.AddScoped<ProyectoService>();

await builder.Build().RunAsync();