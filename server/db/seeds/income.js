/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('incomes').del()

  await knex('incomes').insert([
    {
      id: 1,
      name: 'Test income 1',
      type: 'Work',
      frequency: 'Monthly',
      date: '05/04/2025',
      expected: '50.00',
      notes: 'This is a test',
    },
  ])
}
