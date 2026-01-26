/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('user_data').del()

  await knex('user_data').insert([
    {
      id: 1,
      colors: '{"font":"#110601","background":"#deeaf3","background1":"#deeaf3","background2":"#7f9fe6","background3":"#a0bddd","background4":"#c0d4eb","button1":"#85d685","button2":"#e6dd66","button3":"#b30f0f","button4":"#bbbbbb","color1":"#eca859","color1dark":"#d17a16","color1light1":"#ebbb8e","color1light2":"#ebcab3","color2":"#e6dd66","color2dark":"#e4c53d","color2light1":"#ebdb8e","color2light2":"#ebdeb3","color3":"#7f9fe6","color3dark":"#1e59d8","color3light1":"#a0bddd","color3light2":"#c0d4eb","color4":"#85d685","color4dark":"#0fa334","color4light1":"#a0dda3","color4light2":"#c0ebda","color5":"#e74b4b","color5dark":"#b30f0f","color5light1":"#e7a4ad","color5light2":"#e7c6c7"}',
      borders: '{"border":"10px","button":"5px"}',
      fonts: '',
      dates_range: '',
      leaving_point: '',
      user_id: 1,
    },
  ])
}
