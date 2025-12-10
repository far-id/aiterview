describe("POST /api/initialQuestion", () => {
  it("should return an initial question", async () => {
    const response = await fetch("http://localhost:3000/api/initialQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //position, description, responsibility, requirement
        position: "Software Engineer",
        description: "Develop and maintain web applications.",
        responsibility: "Write clean, maintainable code and collaborate with team members.",
        requirement: "Proficiency in JavaScript and React.",

      }),
    });

    expect(response.ok).toBe(true);
    expect(response.headers.get("Content-Type")).toBe("application/json");
    const data = await response.json();
    expect(data).toHaveProperty("prompt");
    expect(data).toHaveProperty("message");
    expect(data.message).toHaveProperty("pertanyaan");
    expect(data.message).toHaveProperty("kategori");
    expect(data.message).toHaveProperty("tips");
    expect(data.message.pertanyaan).toBeDefined();
    expect(data.message.kategori).toBeDefined();
    expect(data.message.tips).toBeDefined();
  });
});
