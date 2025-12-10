describe("POST /api/summary", () => {
  it("should return summary of interview", async () => {
    const response = await fetch("http://localhost:3000/api/summary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversations: [
          {
            role: "user",
            text: "kamu adalah pewawancara berbahasa indonesia yang sudah ahli, berpengalaman dan adaptif, mampu menggali informasi mendalam dari kandidat. Gunakan metode BEI yang mengikuti format 'STAR' atau 'SAR' atau 'CAR' untuk membuat pertanyaan. buatkan 8 pertanyaan dengan kategori 'technical', 'behavioral' atau 'situational'.\n    technical bertujuan Menilai pengetahuan dan keterampilan teknis kandidat yang relevan dengan posisi yang dilamar.\n    behavioral bertujuan Menggali bagaimana kandidat telah menangani situasi tertentu di masa lalu untuk memprediksi perilaku mereka di masa depan.\n    situasional bertujuan Menilai bagaimana kandidat akan menangani situasi hipotetis yang mungkin terjadi di tempat kerja.\n    buat hanya menampilkan pertanyaan, kategori dan tips saja dalam bentuk json, jangan berikan respon lain selain dalam bentuk json. semua yang saya kirimkan selanjutnya merupakan jawaban saya.\n    tampilkan pertanyaan satu per satu setelah saya menjawab pertanyaan tersebut. kemudian lanjut ke pertanyaan selanjutnya dan jika memungkinkan sesuaikan dengan jawaban saya sebelumnya. jika pertanyaan berhubungan dengan jawaban saya sebelumnya maka coba ubah kalimat pertanyaannya agar lebih spesifik. berikan beragam pertanyaan yang berhubungan dengan tanggung jawab atau requirement yang ada pada lowongan. Berikan juga variasi pertanyaan yang berbeda untuk setiap kategori.\n    setelah saya menjawab semua pertanyaan, saya akan meminta penilaianmu dari masing masing jawaban saya dengan menerapkan BEI dalam satu respon json.\n\n    Berikut adalah post lowongan pekerjaan untuk posisi backend laravel developer:\n    deskripsi pekerjaan atau perusahaan: Steradian Data Optima is a fast growing IT company based in Jakarta with products and services including software development and data management. Our vision is become the big 5 IT consultants in ASEAN, Japan, Middle East and Australia. We are hiring best talent to grow with us.\n    tanggung jawab: Design, develop, test and deploy back end services\n\nProduce clean, high-performance, scalable and maintainable services\n\nAnalytical thinking and problem solving capabilities\n\nShare experiences and knowledge with other team members\n\nLead technical team including coaching and mentoring\n\nParticipate in the entire application lifecycle, focusing on coding and debugging\n\nWrite clean code to develop robust and scalable software. Troubleshoot and debug to optimize performance\n\nCollaborate with business stakeholders to understand their needs and address technical and design requirements\n\nCollaborate with Front-end developers to integrate user-facing elements with server-side logic\n\nBuild reusable code and libraries for future use. Understand time and space complexity\n    requirement: S1 in Computer Science, Informatics, Electrical Engineering, Physics, Mathematics or related with 1 years experienced in back end developer\n\nFamiliar with Go Language and Go idiomatic. Proficient in REST API & GraphQL design, development, testing and deployment.\n\nFamiliar with Linux and Docker, with Redis is a plus.\n\nFamiliar with Laravel Framework\n\nHave knowledge in PostgreSQL, Sql & No SQL Database, Understand Microservices Architecture & it's components like API Gateway is a plus.\n\nExperienced in CI/CD processes and tools (Github or BitBucket, Jenkins or Bamboo, Kubernetes or Openshift).\n\nStrong knowledge in Grpc + protobuf\n\nFamiliar with database modelling\n\nAble to create ci/cd pipeline\n\nWilling to learn new technologies\n\nGood communication skills\n\n2 years of experience\n\nUrgently Hiring\n  "
          },
          {
            role: "model", text: "Ceritakan tentang proyek backend Laravel paling menantang yang pernah Anda tangani. Apa tantangan utamanya, dan bagaimana Anda mengatasinya? (Gunakan format STAR/SAR/CAR untuk menjawab)",
            category: "technical",
            tips: "Pertanyaan ini bertujuan untuk menggali pemahaman kandidat tentang Laravel, kemampuan problem-solving, dan pengalaman praktis dalam menghadapi tantangan teknis."
          },
        ],
        answer: "saya pernah membuat file storage dengan laravel, jadi saya mencoba membuat seperti google drive. tantangan yang saya hadapi adalah ketika menerapkan algoritma penyimpanan file pada app yang saya bangun, pada saat itu saya memanfaatkan sebuah library untuk memudahkan saya mengimplementasi algoritma penyimpanan file. sehingga saya berhasil mengimplementasikannya",
      }),
    });

    expect(response.ok).toBe(true);
    expect(response.headers.get("Content-Type")).toBe("application/json");
    const data = await response.json();
    expect(data).toHaveProperty("message");
    expect(data.message).toHaveProperty("pertanyaan");
    expect(data.message).toHaveProperty("kategori");
    expect(data.message).toHaveProperty("tips");
    expect(data.message.pertanyaan).toBeDefined();
    expect(data.message.kategori).toBeDefined();
    expect(data.message.tips).toBeDefined();
  });
});
