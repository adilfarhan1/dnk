import nodemailer from 'nodemailer'

export async function mailSend(reciver, subject, message) {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: "adilfarhan.laps@gmail.com",
            pass: "qeugwvsxstydegcv",
        },
    });


    const info = await transporter.sendMail({
        from: 'adilfarhan.laps@gmail.com',
        to: reciver,
        subject: subject,
        text: message,
    }).then(data => {
        console.log('Email Send Secessfully')
        return true
    }).catch(err => {
        console.log(err)
        return false
    })

    return info
}

export const generatePass = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}


