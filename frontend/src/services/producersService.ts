import type { Producer } from "../types/producer";

const BASE_URL = `${import.meta.env.VITE_API_URL}/producers`;

type ProducerWithLegacyFields = Partial<Producer> & {
  image_url?: string;
  created_at?: string;
};

function mapProducer(raw: unknown): ProducerWithLegacyFields {
  if (!raw || typeof raw !== "object") return {};

  const source = raw as ProducerWithLegacyFields;

  return {
    ...source,
    imageUrl: source.imageUrl ?? source.image_url ?? "",
    createdAt: source.createdAt ?? source.created_at ?? "",
    direct_skyrocketing_sales: source.direct_skyrocketing_sales ?? false,
    indirect_skyrocketing_sales: source.indirect_skyrocketing_sales ?? false,
  };
}

export const producerService = {
  async getAll() {
    const response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error("Erro ao buscar produtores");
    }

    const data = await response.json();
    return Array.isArray(data) ? data.map(mapProducer) : data;
  },

  async getById(id: number) {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Erro ao buscar produtor");
    }

    const data = await response.json();
    return mapProducer(data);
  },

  async create(payload: Partial<Producer>) {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar produtor");
    }

    const createdProducer = await response.json();
    return mapProducer(createdProducer);
  },

  async update(id: number, payload: Partial<Producer>) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar produtor");
    }

    const updatedProducer = await response.json();
    return mapProducer(updatedProducer);
  },

  async delete(id: number) {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar produtor");
    }

    return true;
  },
};
