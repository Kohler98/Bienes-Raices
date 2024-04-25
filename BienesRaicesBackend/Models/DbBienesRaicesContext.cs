using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BienesRaicesBackend.Models;

public partial class DbBienesRaicesContext : DbContext
{
    public DbBienesRaicesContext()
    {
    }

    public DbBienesRaicesContext(DbContextOptions<DbBienesRaicesContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Categorium> Categoria { get; set; }

    public virtual DbSet<Imagene> Imagenes { get; set; }

    public virtual DbSet<Mensaje> Mensajes { get; set; }

    public virtual DbSet<Precio> Precios { get; set; }

    public virtual DbSet<Propiedade> Propiedades { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    public virtual DbSet<VwRandomValue> VwRandomValues { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Categorium>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Categori__3213E83FF331D7E0");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Imagene>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Imagenes__3213E83F27C52AC8");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Imagen).HasColumnType("image");
            entity.Property(e => e.PropiedadId).HasColumnName("propiedadId");
            entity.Property(e => e.UsuarioId).HasColumnName("usuarioId");

            entity.HasOne(d => d.Propiedad).WithMany(p => p.Imagenes)
                .HasForeignKey(d => d.PropiedadId)
                .HasConstraintName("FK__Imagenes__propie__056ECC6A");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Imagenes)
                .HasForeignKey(d => d.UsuarioId)
                .HasConstraintName("FK__Imagenes__usuari__0662F0A3");
        });

        modelBuilder.Entity<Mensaje>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Mensaje__3213E83FC22A5082");

            entity.ToTable("Mensaje");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Contenido)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("contenido");
            entity.Property(e => e.Fecha)
                .HasColumnType("datetime")
                .HasColumnName("fecha");
            entity.Property(e => e.PropiedadId).HasColumnName("propiedadId");
            entity.Property(e => e.UsuarioId).HasColumnName("usuarioId");

            entity.HasOne(d => d.Propiedad).WithMany(p => p.Mensajes)
                .HasForeignKey(d => d.PropiedadId)
                .HasConstraintName("FK__Mensaje__propied__220B0B18");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Mensajes)
                .HasForeignKey(d => d.UsuarioId)
                .HasConstraintName("FK__Mensaje__usuario__22FF2F51");
        });

        modelBuilder.Entity<Precio>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Precios__3213E83F7073AF1F");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Propiedade>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Propieda__3213E83F07959A9D");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Calle)
                .HasMaxLength(60)
                .IsUnicode(false)
                .HasColumnName("calle");
            entity.Property(e => e.CategoriaId).HasColumnName("categoriaId");
            entity.Property(e => e.Descripcion)
                .HasColumnType("text")
                .HasColumnName("descripcion");
            entity.Property(e => e.Estacionamiento).HasColumnName("estacionamiento");
            entity.Property(e => e.Habitaciones).HasColumnName("habitaciones");
            entity.Property(e => e.Lat)
                .HasMaxLength(60)
                .IsUnicode(false)
                .HasColumnName("lat");
            entity.Property(e => e.Lng)
                .HasMaxLength(60)
                .IsUnicode(false)
                .HasColumnName("lng");
            entity.Property(e => e.PrecioId).HasColumnName("precioId");
            entity.Property(e => e.Publicado).HasColumnName("publicado");
            entity.Property(e => e.Titulo)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("titulo");
            entity.Property(e => e.Url)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("url");
            entity.Property(e => e.UsuarioId).HasColumnName("usuarioId");
            entity.Property(e => e.Wc).HasColumnName("wc");

            entity.HasOne(d => d.Categoria).WithMany(p => p.Propiedades)
                .HasForeignKey(d => d.CategoriaId)
                .HasConstraintName("FK__Propiedad__categ__7EC1CEDB");

            entity.HasOne(d => d.Precio).WithMany(p => p.Propiedades)
                .HasForeignKey(d => d.PrecioId)
                .HasConstraintName("FK__Propiedad__preci__7DCDAAA2");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Propiedades)
                .HasForeignKey(d => d.UsuarioId)
                .HasConstraintName("FK__Propiedad__usuar__7CD98669");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Usuario__3213E83F03657B54");

            entity.ToTable("Usuario");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Activo).HasColumnName("activo");
            entity.Property(e => e.Apellido)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("apellido");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Imagen)
                .HasColumnType("image")
                .HasColumnName("imagen");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Password)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("password");
            entity.Property(e => e.Token)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("token");
            entity.Property(e => e.Url)
                .HasMaxLength(100)
                .IsUnicode(false)
                .HasColumnName("url");
        });

        modelBuilder.Entity<VwRandomValue>(entity =>
        {
            entity
                .HasNoKey()
                .ToView("vw_RandomValue");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
