class Car {
  constructor(noPol, owner) {
    this.noPol = noPol;
    this.owner = owner;
  }
}

class ParkLot {
  capacity;
  remaining;
  parkedCars;
  constructor(capacity) {
    this.capacity = capacity;
    this.remaining = capacity;
    this.parkedCars = [];
  }
  createPark(capacity) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const parkLot = new ParkLot(capacity);
        resolve(parkLot);
      }, 5000);
    });
  }
  park(car) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.remaining > 0) {
          if (!this.parkedCars.find((c) => c.noPol === car.noPol)) {
            this.parkedCars.push(car);
            this.remaining--;
            return resolve(
              `Mobil ${car.owner} dengan Nopol ${car.noPol} berhasil parkir.`
            );
          } else {
            console.log(
              `Mobil ${car.owner} dengan Nopol ${car.noPol} sudah parkir.`
            );
          }
        } else {
          return reject("Maaf parkir sudah penuh");
        }
      }, 3000);
    });
  }

  leave(noPol) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.parkedCars.findIndex((car) => car.noPol === noPol);
        if (index !== -1) {
          this.parkedCars.splice(index, 1);
          resolve(`Mobil dengan Nopol ${noPol} berhasil keluar`);
        } else {
          console.log(`Mobil dengan Nopol ${noPol} tidak ada`);
        }
      }, 1500);
    });
  }

  check() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { capacity, remaining } = this;
        resolve({
          capacity: capacity,
          remaining: remaining,
          parkedCars: this.parkedCars.map((car) => car.noPol),
        });
      }, 500);
    });
  }
}

async function main() {
  const park = new ParkLot();
  let parkLot;
  const car1 = new Car("B2018", "Alice");
  const car2 = new Car("B2019", "Johnson");
  const car3 = new Car("B2020", "Sun");
  const car4 = new Car("B2021", "Lylia");
  const car5 = new Car("B2022", "Nana");
  const car6 = new Car("B2023", "Brody");

  try {
    parkLot = await park.createPark(3);
    console.log(
      `Tempat parkir berhasil dibuat dengan kapasitas ${parkLot.capacity} kendaraan`
    );

    const park1 = await parkLot.park(car1);
    console.log(park1);

    const check1 = await parkLot.check();
    console.log(check1);

    const park2 = await parkLot.park(car2);
    console.log(park2);

    const check2 = await parkLot.check();
    console.log(check2);

    const park3 = await parkLot.park(car3);
    console.log(park3);

    const check3 = await parkLot.check();
    console.log(check3);

    const leave1 = await parkLot.leave(car3.noPol);
    console.log(leave1);

    const leave3 = await parkLot.leave(car1.noPol);
    console.log(leave3);

    const park5 = await parkLot.park(car4);
    console.log(park5);

    const check4 = await parkLot.check();
    console.log(check4);

    const park6 = await parkLot.park(car5);
    console.log(park6);
  } catch (err) {
    console.log(err);
  }
}

main();
