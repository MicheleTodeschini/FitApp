import TabBar from "../components/TabBar";
import Chart from "./Chart";

export default function HomePage() {

    return (
        <>
            {/*  Header */}
            <section>
                <div className="top-header">
                    <h1>Hello</h1>

                </div>

            </section>

            {/* Main */}
            <section>
                <Chart />
                <div className="bodyweight">
                    <p>here goes the bodyweight</p>
                </div>
            </section>
            {/* Footer */}
            <section>
                <div>
                    <TabBar />
                </div>
            </section>
        </>
    )

}