<header>
        <div class="row">
            <div class="col-lg-4 col-4 d-flex align-items-center">
                <!-- <h3>{{ ADMIN }}</h3> -->
            </div>
            <div class="col-lg-8 text-right col-8 d-flex justify-content-end">
                <div class="log-sec">
                    <div class="d-flex align-items-center">
                        <div class="btn-group pro-box ms-3">
                            <div class="d-inline-flex align-items-center">
                                <div class="pro-dtls px-2 text-start">
                                    <h3><span>Welcome, <br></span>{{ Auth::user()->name }}</h3>
                                </div>
                            </div>
                        </div>
                        <button type="button" class="header-profile btn btn-user dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="fas fa-user fa-2x"></i>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                            <a class="dropdown-item" href="{{ route('logout') }}"
                               onclick="event.preventDefault();
                                             document.getElementById('logout-form').submit();">
                                {{ __('Logout') }}
                            </a>

                            <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                @csrf
                            </form>
                            </li>
                        </ul>
                    </div>
                </div>
                <a class="button-show" href="javascript:void(0)" onclick="togglemenu()">
                    <i class="fa-solid fa-bars"></i>
                </a>
            </div>
        </div>
    </header>