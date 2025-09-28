// pages/docs.js

// ... (dynamic import dan komponen ApiDoc tetap sama)
// ...

export async function getServerSideProps() {
    
  const { generateApi } = await import('next-swagger-doc');

  const swagger = await generateApi({
    definition: {
      // ... (Definisi Swagger)
    },
    
    // 💥 FIX TERAKHIR: Hapus pemindaian 'src/**/*.js'
    // Logika JSDoc hanya perlu ada di API Routes itu sendiri.
    apiFolder: 'pages/api', 
    files: [
        'pages/api/**/*.js', 
        // Hapus: 'src/**/*.js'
    ],
  });

  return {
    props: {
      swagger,
    },
  };
}
