import React, { Component } from 'react'
import Instructions from './Instructions'
import Exercise from './Exercise'

const instructions =
  // eslint-disable-next-line no-multi-str
  'Tämän luvun tavoitteena on, että hallitset reaalilukujen peruslaskutoimitukset ja laskujärjestyksen. Osaat \
    antaa esimerkkejä eri lukualueisiin kuuluvista luvuista\
    päätellä lopputuloksen etumerkin yhteen- ja vähennyslaskussa sekä kerto- ja jakolaskussa\
    laskea murtolukujen summia, erotuksia, tuloja ja osamääriä\
    muodostaa annetun luvun vastaluvun ja käänteisluvun\
    muuttaa sekaluvun tai desimaalimuodossa esitetyn rationaaliluvun murtolukumuotoon\
    hyödyntää reaalilukujen laskulakeja päässälaskujen helpottamisessa.\
    Lisäksi tiedät, että määritelmä on matematiikassa sopimus siitä, mitä jollakin käsitteellä tarkoitetaan.'

const exercise = {
  question: 'Ilmoita seuraavat prosentit desimaalilukumuodossa ilman prosenttimerkkiä:',
  options: [
    '$$50\\ \\%$$',
    '$$8{,}3\\ \\%$$',
    '$$24\\ \\%$$',
    '$$160\\ \\%$$',
    '$$230\\ \\%$$'

  ]
}

export class Course extends Component<{}, { instructions: string }> {
  constructor(props: any) {
    super(props)

    this.state = {
      instructions: null,
    }
  }

  componentDidMount() {
    this.setState({
      instructions
    })
  }

  render() {
    return (
      <div className="container">
        <h3 style={{ textAlign: 'center' }}>Luvut ja laskutoimitukset</h3>
        <Instructions instructions={this.state.instructions} />
        <Exercise exercise={exercise} />

      </div >
    )
  }
}

export default Course
