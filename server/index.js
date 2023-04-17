import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import bodyParser from "body-parser"



const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect("mongodb://127.0.0.1:27017/vmm", {
        useNewUrlParser: true,
        useUnifiedTopology: true }
).then(() => console.log("Connected to MongoDB"))


const volunteerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    country: String,
    city: String,
    password: String,
    role: String
})

const Volunteer = new mongoose.model("Volunteer", volunteerSchema)

const orgSchema = new mongoose.Schema({
    name: String,
    email: String,
    country: String,
    city: String,
    password: String,
    role: String
})

const org = new mongoose.model("org", orgSchema)

const RoleSchema = new mongoose.Schema({
    role: {
        type: String,
        required: true,
    },
    skills: {
        type: String,
        required: true,
    },
});

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    numVolunteers: {
        type: Number,
        required: true,
    },
    companyId: {
        type: String,
        required: true,
    },
    roles: {
        type: [RoleSchema],
        required: true,
    },
    
});

const Event = mongoose.model('Event', EventSchema);

//routes
app.post("/homepage", (req, res) => {
    res.send("MY API ")
})
app.post("/loginorg", (req, res) => {
    const { email, password } = req.body
    org.findOne({ email: email }).then(organisation => {
        if (organisation) {
            if (organisation.password === password) {
                res.send({ message: "organisation Logged In Successfully", organisation: organisation })
            } else {
                res.send({ message: "organisation password is incorrect" })
            }
        } else {
            res.send({ message: "organisation does not exists" })
        }
    })
})
app.post("/login", (req, res) => {
    const { email, password } = req.body
    Volunteer.findOne({ email: email }).then(volunteer => {
        if (volunteer) {
            if (volunteer.password === password) {
                res.send({ message: "Volunteer Logged In Successfully", volunteer: volunteer })
            } else {
                res.send({ message: "Volunteer password is incorrect" })
            }
        } else {
            res.send({ message: "Volunteer does not exists" })
        }
    })

})
app.post("/register", (req, res) => {
    const { name, email, phone, country, city, password } = req.body
    Volunteer.findOne({ email: email }).then(volunteer => {
        if (volunteer) {
            res.send("Volunteer already exists")
        } else {
            const volunteer = new Volunteer({
                name,
                email,
                phone,
                country,
                city,
                password,
                role: "volunteer"
            })
            volunteer.save().then(() => {
                res.send("Volunteer Registered Successfully")

            }).catch((err) => {
                console.log(err);
            })
        }
    })
})
app.post("/registerorg", (req, res) => {
    const { name, email, country, city, password } = req.body
    org.findOne({ email: email }).then(organisation => {
        if (organisation) {
            res.send("organisation already exists")
        } else {
            const organisation = new org({
                name,
                email,
                country,
                city,
                password,
                role: "organisation"
            })
            organisation.save().then(() => {
                res.send("org Registered Successfully")
            }).catch((err) => {
                console.log(err);
            })
        }
    })
})
app.post('/add-event', async (req, res) => {
    const eventData = req.body;

    try {
        const newEvent = new Event(eventData);
        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully' });
    } catch (err) { 
        res.status(400).json({ message: 'Error creating event', error: err });
    }
});


app.listen(9002, () => {
    console.log("Server is running on port 9002")
})
