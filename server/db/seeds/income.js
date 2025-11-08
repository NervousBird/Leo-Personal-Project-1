/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('income').del()

  await knex('income').insert([
    {
      id: 1,
      name: 'Test income 1',
      date: 'today',
      expected: '50.00',
      notes: 'This is a test',
      transaction_ids: [1, 2],
    },
  ])
}
