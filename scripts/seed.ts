const {PrismaClient} =  require("@prisma/client");

const database = new PrismaClient();

async function main(){
    try{
        await database.category.createMany({
            data: [
                {name: "Computer Science"},
                {name: "Music"},
                {name: "Fitness"},
                {name: "Photography"},
                {name: "Engineering"},
                {name: "Accounting"},
                {name: "Filming"},

            ]
        })

        console.log("SuccessFully run seed.ts");
    }catch(error){
        console.log("Eroor seeding the db", error);
    }finally{
        await database.$disconnect();
    }
}

main();