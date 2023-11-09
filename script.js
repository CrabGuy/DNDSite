

const OriginalTemplate = document.getElementById("Template")
const Template = OriginalTemplate.cloneNode(true)
OriginalTemplate.remove()
const Container = document.getElementById("Container")
const AddButton = document.getElementById("AddButton")

const Save = (Value) => {
    localStorage.setItem("Presets", Value)
}

const Load = () => JSON.parse(localStorage.getItem("Presets") || "[]")

const AddSave = (Value) => {
    const Saved = Load()
    Saved.push(Value)
    Save(JSON.stringify(Saved))
}

const RemoveSave = (Value) => {
    const Saved = Load()
    Saved.splice(Saved.indexOf(Value), 1)
    Save(JSON.stringify(Saved))
}

const CreatePreset = (Values, ToSave) => {
    const NewTemplate = Template.cloneNode(true)
    Container.appendChild(NewTemplate)

    Values.forEach(element => {
        NewTemplate.querySelector("#" + element[0]).firstChild.textContent = element[0] == "Nome" ? element[1] : element[0] + ": " + element[1]
    });

    if (ToSave) {
        AddSave(Values)
    }


    NewTemplate.querySelector("#DeleteButton").addEventListener("click", () => {
        NewTemplate.remove()
        RemoveSave(Values)
    })

    NewTemplate.querySelector("#SpawnButton").addEventListener("click", () => {
        CreateMonster(Values)
    })
}

const Stats = [
    "Nome",
    "Vita",
    "Armatura",
    "Forza",
    "Destrezza",
    "Costituzione",
    "Intelligenza",
    "Saggezza",
    "Charisma",
    "Armi"
]

const Presets = Load()

AddButton.addEventListener("click", () => {
    const Values = Stats.map((Value) => [Value, prompt(Value)])

    CreatePreset(Values, true)
})

const OriginalAliveTemplate = document.getElementById("AliveTemplate")
const AliveTemplate = OriginalAliveTemplate.cloneNode(true)
OriginalAliveTemplate.remove()
const AliveContainer = document.getElementById("AliveContainer")

const CreateMonster = (Values) => {
    const NewTemplate = AliveTemplate.cloneNode(true)
    AliveContainer.appendChild(NewTemplate)

    Values.forEach(element => {
        console.log(element)
        NewTemplate.querySelector("#Alive" + element[0]).firstChild.textContent = element[0] == "Nome" ? element[1] : element[0] + ": " + element[1]
    });

    let CurrentHealth = Number(Values[1][1]) || 0
    NewTemplate.querySelector("#Hit").addEventListener("click", () => {
        let NewHealth = CurrentHealth - (Number(NewTemplate.querySelector("#Damage").value) || 0)
        NewTemplate.querySelector("#AliveVita").firstChild.textContent = "Vita: " + NewHealth
        if (NewHealth <= 0) {
            NewTemplate.remove()
        }
        CurrentHealth = NewHealth
    })
}

Presets.forEach((Value) => CreatePreset(Value))