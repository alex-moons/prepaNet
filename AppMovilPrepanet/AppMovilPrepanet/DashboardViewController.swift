//
//  DashboardViewController.swift
//  AppMovilPrepanet
//
//  Created by alex on 11/10/22.
//

import UIKit

class DashboardViewController: UIViewController, UITableViewDelegate, UITableViewDataSource{

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return talleres.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell") as! CustomTallerTableViewCell
        
        cell.lbEnum.text = String(indexPath.row+1)
        cell.lbNombre.text = talleres[indexPath.row].nombre
        cell.lbStatus.text = talleres[indexPath.row].status
        
        return cell
    }

    @IBOutlet weak var tbTalleres: UITableView!
    
    var talleres = [taller]()

    override func viewDidLoad() {
        super.viewDidLoad()
        talleres = [
            taller(nombre: "Liderazgo Positivo y Transformación Personal", status: "Aprobado"),
            taller(nombre: "Mis Habilidades y Motivaciones", status: "Aprobado"),
            taller(nombre: "Mis Emociones", status: "No Aprobado"),
            taller(nombre: "Mis Relaciones", status: "No enrolado por no aprobar la etapa 3"),
            taller(nombre: "Mis Áreas de Oportunidad", status: "Sin inscripción"),
            taller(nombre: "Mis Metas", status: "Sin Inscripción")
        ]
    }

}
