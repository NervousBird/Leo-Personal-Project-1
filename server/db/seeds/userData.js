/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('user_data').del()

  await knex('user_data').insert([
    {
      id 1,
      colors: '',
      dates_range: '',
      leaving_point: '',
      user_id: 1
    },
  ]);
};
